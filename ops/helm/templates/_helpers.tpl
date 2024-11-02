{{/* Expand the name of the chart. */}}
{{- define "cacao.name" -}}
{{- default $.Chart.Name $.Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/* Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name. */}}
{{- define "cacao.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "cacao.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- /* cacao.version is the version of the deployed NLU Service.
Used as the container image tag */}}
{{ define "cacao.version" -}}
{{ default .Chart.AppVersion .Values.imagesConfiguration.global.tag }}
{{- end -}}

{{/* Common labels found at : https://helm.sh/docs/chart_best_practices/labels/#standard-labels*/}}
{{- define "cacao.commonLabels" -}}
{{ include "cacao.selectorLabels" . }}
app.kubernetes.io/part-of: cacao
app.kubernetes.io/version: {{ include "cacao.version" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
helm.sh/chart: {{ include "cacao.chart" . }}
{{- if .Values.globalLabels }}
{{ toYaml .Values.globalLabels }}
{{- end -}}
{{- end }}

{{- define "cacao.globalAnnotations" -}}
{{- if .Values.globalAnnotations }}
{{- with .Values.globalAnnotations }}
{{- toYaml . }}
{{- end -}}
{{- end -}}
{{- end }}

{{- define "cacao.selectorLabels" -}}
app.kubernetes.io/instance: {{ include "cacao.fullname" . }}
{{- end }}

{{- /* cacao.namespace is the default deployment namespace for the release */}}
{{ define "cacao.namespace" -}}
{{ default "default" .Release.Namespace }}
{{- end -}}

{{- /* cacao.imagePullSecrets will build the string array of secret name of ImagePullSecrets
  at the condition that either .Values.deployment.imagePullSecrets or .Values.managedImagePullSecret
  is not empty */}}
{{ define "cacao.imagePullSecrets" -}}
{{- if or .Values.imagePullSecrets .Values.managedImagePullSecret -}}
imagePullSecrets:
{{- if .Values.managedImagePullSecret }}
  - name: managed-regcred-{{ include "cacao.fullname" . }}
{{- end -}}
{{- with .Values.imagePullSecrets -}}
{{ toYaml . | nindent 2 }}
{{- end -}}
{{- end -}}
{{- end -}}

{{- /*** Image URL Section ***/ -}}
{{- /* cacao.globalImage.repo */}}
{{ define "cacao.globalImage.repo" -}}
{{ default "ghcr.io/neitofr/association-cacao" .Values.imagesConfiguration.global.repo }}
{{- end -}}

{{- /* cacao.globalImage.tag */}}
{{ define "cacao.globalImage.tag" -}}
{{ default .Chart.AppVersion .Values.imagesConfiguration.global.tag }}
{{- end -}}

{{- /* cacao.globalImage.url */}}
{{ define "cacao.globalImage.url" -}}
{{ printf "%s:%s" (include "cacao.globalImage.repo" .) (include "cacao.globalImage.tag" .)}}
{{- end -}}

{{- /* cacao.strapiImage.repo */}}
{{ define "cacao.strapiImage.repo" -}}
{{ default (include "cacao.globalImage.repo" .) .Values.imagesConfiguration.custom.strapi.repo }}
{{- end -}}

{{- /* cacao.strapiImage.tag */}}
{{ define "cacao.strapiImage.tag" -}}
{{ default (include "cacao.globalImage.tag" .) .Values.imagesConfiguration.custom.strapi.tag }}
{{- end -}}

{{- /* cacao.strapiImage.url */}}
{{ define "cacao.strapiImage.url" -}}
{{ printf "%s:%s" (include "cacao.strapiImage.repo" .) (include "cacao.strapiImage.tag" .) }}
{{- end -}}

{{- /* cacao.frontImage.repo */}}
{{ define "cacao.frontImage.repo" -}}
{{ default (include "cacao.globalImage.repo" .) .Values.imagesConfiguration.custom.front.repo }}
{{- end -}}

{{- /* cacao.frontImage.tag */}}
{{ define "cacao.frontImage.tag" -}}
{{ default (include "cacao.globalImage.tag" .) .Values.imagesConfiguration.custom.front.tag }}
{{- end -}}

{{- /* cacao.frontImage.url */}}
{{ define "cacao.frontImage.url" -}}
{{ printf "%s:%s" (include "cacao.frontImage.repo" .) (include "cacao.frontImage.tag" .) }}
{{- end -}}