import { useState, useEffect } from "react";
import type { Cat } from "../../interfaces/Cat";

interface FilterState {
  adopted: boolean | null;
  gender: string | null;
  hasSpecialNeeds: boolean | null;
  isDogFriendly: string | null;
  isCatFriendly: string | null;
  isChildrenFriendly: string | null;
}

interface CatFilterProps {
  cats: Cat[];
  initialFilter?: {
    adopted?: boolean;
  };
}

export default function CatFilter({
  cats,
  initialFilter = {},
}: CatFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    adopted: initialFilter.adopted ?? null,
    gender: null,
    hasSpecialNeeds: null,
    isDogFriendly: null,
    isCatFriendly: null,
    isChildrenFriendly: null,
  });

  const [activeFilters, setActiveFilters] = useState<
    { key: string; value: string }[]
  >([]);

  useEffect(() => {
    const filteredCats = cats.filter((cat) => {
      return (
        (filters.adopted === null || cat.adopted === filters.adopted) &&
        (filters.gender === null || cat.gender === filters.gender) &&
        (filters.hasSpecialNeeds === null ||
          (filters.hasSpecialNeeds
            ? cat.sicknesses && cat.sicknesses.length > 0
            : !cat.sicknesses?.length)) &&
        (filters.isDogFriendly === null ||
          (cat.socialSkills &&
            cat.socialSkills.isDogFriendly === filters.isDogFriendly)) &&
        (filters.isCatFriendly === null ||
          (cat.socialSkills &&
            cat.socialSkills.isCatFriendly === filters.isCatFriendly)) &&
        (filters.isChildrenFriendly === null ||
          (cat.socialSkills &&
            cat.socialSkills.isChildrenFriendly === filters.isChildrenFriendly))
      );
    });

    // Dispatch custom event with filtered cats
    const event = new CustomEvent("filterChange", { detail: filteredCats });
    window.dispatchEvent(event);

    // Update active filters
    const newActiveFilters = Object.entries(filters)
      .filter(([_, value]) => value !== null)
      .map(([key, value]) => ({
        key,
        value:
          typeof value === "boolean"
            ? value
              ? "Adopté"
              : "Disponible"
            : value.toString(),
      }));
    setActiveFilters(newActiveFilters);
  }, [filters, cats]);

  const clearFilters = () => {
    setFilters({
      adopted: null,
      gender: null,
      hasSpecialNeeds: null,
      isDogFriendly: null,
      isCatFriendly: null,
      isChildrenFriendly: null,
    });
  };

  const removeFilter = (key: string) => {
    setFilters((prev) => ({ ...prev, [key]: null }));
  };

  return (
    <div className="w-full mb-8">
      {/* Filter Controls */}
      <div className="bg-tertiary rounded-3xl p-6 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Adoption Status */}
          <div className="flex flex-col">
            <label className="text-[22px] font-medium text-stone-600 mb-2">
              Statut
            </label>
            <select
              className="rounded-xl border-[3px] border-white bg-white text-[18px] p-2 focus:border-primary focus:ring-primary"
              value={filters.adopted === null ? "" : filters.adopted.toString()}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  adopted:
                    e.target.value === "" ? null : e.target.value === "true",
                }))
              }
            >
              <option value="">Tous</option>
              <option value="false">Disponible</option>
              <option value="true">Adopté</option>
            </select>
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="text-[22px] font-medium text-stone-600 mb-2">
              Genre
            </label>
            <select
              className="rounded-xl border-[3px] border-white bg-white text-[18px] p-2 focus:border-primary focus:ring-primary"
              value={filters.gender || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  gender: e.target.value || null,
                }))
              }
            >
              <option value="">Tous</option>
              <option value="Mâle">Mâle</option>
              <option value="Femelle">Femelle</option>
            </select>
          </div>

          {/* Special Needs */}
          <div className="flex flex-col">
            <label className="text-[22px] font-medium text-stone-600 mb-2">
              Besoins spéciaux
            </label>
            <select
              className="rounded-xl border-[3px] border-white bg-white text-[18px] p-2 focus:border-primary focus:ring-primary"
              value={
                filters.hasSpecialNeeds === null
                  ? ""
                  : filters.hasSpecialNeeds.toString()
              }
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  hasSpecialNeeds:
                    e.target.value === "" ? null : e.target.value === "true",
                }))
              }
            >
              <option value="">Tous</option>
              <option value="true">Avec besoins spéciaux</option>
              <option value="false">Sans besoins spéciaux</option>
            </select>
          </div>

          {/* Compatibility Filters */}
          <div className="flex flex-col">
            <label className="text-[22px] font-medium text-stone-600 mb-2">
              Compatible avec les chiens
            </label>
            <select
              className="rounded-xl border-[3px] border-white bg-white text-[18px] p-2 focus:border-primary focus:ring-primary"
              value={filters.isDogFriendly || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  isDogFriendly: e.target.value || null,
                }))
              }
            >
              <option value="">Tous</option>
              <option value="yes">Oui</option>
              <option value="no">Non</option>
              <option value="maybe">Peut-être</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-[22px] font-medium text-stone-600 mb-2">
              Compatible avec les chats
            </label>
            <select
              className="rounded-xl border-[3px] border-white bg-white text-[18px] p-2 focus:border-primary focus:ring-primary"
              value={filters.isCatFriendly || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  isCatFriendly: e.target.value || null,
                }))
              }
            >
              <option value="">Tous</option>
              <option value="yes">Oui</option>
              <option value="no">Non</option>
              <option value="maybe">Peut-être</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-[22px] font-medium text-stone-600 mb-2">
              Compatible avec les enfants
            </label>
            <select
              className="rounded-xl border-[3px] border-white bg-white text-[18px] p-2 focus:border-primary focus:ring-primary"
              value={filters.isChildrenFriendly || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  isChildrenFriendly: e.target.value || null,
                }))
              }
            >
              <option value="">Tous</option>
              <option value="yes">Oui</option>
              <option value="no">Non</option>
              <option value="maybe">Peut-être</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6">
          {activeFilters.map((filter) => (
            <span
              key={filter.key}
              className="inline-flex items-center px-4 py-2 rounded-full text-[18px] font-medium bg-primary text-white"
            >
              {filter.value}
              <button
                onClick={() => removeFilter(filter.key)}
                className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full hover:bg-white/20"
              >
                ×
              </button>
            </span>
          ))}
          <button
            onClick={clearFilters}
            className="text-[18px] text-stone-600 hover:text-stone-800 underline"
          >
            Effacer tous les filtres
          </button>
        </div>
      )}
    </div>
  );
}
