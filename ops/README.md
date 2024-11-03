# deploy CD job

name: CD

on:
workflow_run:
workflows: ["CI"]
types: - completed

jobs:
deploy:
runs-on: self-hosted # Run this job on your self-hosted runner
if: ${{ github.event.workflow_run.conclusion == 'success' }}
steps: - name: Checkout code
uses: actions/checkout@v4
with:
fetch-depth: 0 # Ensure full git history is fetched, including tags

      - name: Set GitHub user
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "actions@github.com"

      # Step to pull the latest Docker image matching the tag and deploy with Helm
      - name: Deploy to Kubernetes using Helm
        env:
          APP_KEYS: ${{ secrets.APP_KEYS }}
          API_TOKEN_SALT: ${{ secrets.API_TOKEN_SALT }}
          ADMIN_JWT_SECRET: ${{ secrets.ADMIN_JWT_SECRET }}
          TRANSFER_TOKEN_SALT: ${{ secrets.TRANSFER_TOKEN_SALT }}
          DATABASE_HOST: ${{ vars.DATABASE_HOST }}
          DATABASE_PORT: ${{ vars.DATABASE_PORT }}
          DATABASE_PASSWORD: ${{ secrets.DATABASE_PASSWORD }}
          JWT_SECRET: ${{ secrets.JWT_SECRET }}
        run: |
          # Check if the tag was correctly fetched
          TAG=$(git describe --tags --abbrev=0)
          echo "Deploying version $TAG"

          # Perform Helm upgrade (or install if it doesn't exist)
          helm upgrade --install cacao ./ops/helm \
            --namespace cacao --create-namespace \
            --set imagesConfiguration.global.tag="$TAG" \
            --set deployments.strapi.config.APP_KEYS="$APP_KEYS" \
            --set deployments.strapi.config.API_TOKEN_SALT="$API_TOKEN_SALT" \
            --set deployments.strapi.config.ADMIN_JWT_SECRET="$ADMIN_JWT_SECRET" \
            --set deployments.strapi.config.TRANSFER_TOKEN_SALT="$TRANSFER_TOKEN_SALT" \
            --set deployments.strapi.config.DATABASE_HOST="$DATABASE_HOST" \
            --set deployments.strapi.config.DATABASE_PORT="$DATABASE_PORT" \
            --set deployments.strapi.config.DATABASE_PASSWORD="$DATABASE_PASSWORD" \
            --set deployments.strapi.config.JWT_SECRET="$JWT_SECRET"

      # Optional: Verify the deployment status
      - name: Check Deployment Status
        run: |
          helm status -n neitosden-react betterpi