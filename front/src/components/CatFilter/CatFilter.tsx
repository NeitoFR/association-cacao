import { useState, useEffect, useRef } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        filterRef.current &&
        !filterRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
    <div className="relative">
      {/* Toggle Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 top-24 z-50 bg-secondary text-white p-3 rounded-full shadow-lg hover:bg-secondary/90 transition-colors duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      </button>

      {/* Filter Panel */}
      <div
        ref={filterRef}
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <h2 className="text-2xl font-bold text-secondary mb-6">Filtres</h2>

          {/* Filter Controls */}
          <div className="space-y-6">
            {/* Adoption Status */}
            <div className="flex flex-col">
              <label className="text-lg font-medium text-stone-600 mb-2">
                Statut
              </label>
              <select
                className="rounded-xl border-[3px] border-white bg-white text-base p-2 focus:border-primary focus:ring-primary"
                value={
                  filters.adopted === null ? "" : filters.adopted.toString()
                }
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
              <label className="text-lg font-medium text-stone-600 mb-2">
                Genre
              </label>
              <select
                className="rounded-xl border-[3px] border-white bg-white text-base p-2 focus:border-primary focus:ring-primary"
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
              <label className="text-lg font-medium text-stone-600 mb-2">
                Besoins spéciaux
              </label>
              <select
                className="rounded-xl border-[3px] border-white bg-white text-base p-2 focus:border-primary focus:ring-primary"
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
              <label className="text-lg font-medium text-stone-600 mb-2">
                Compatible avec les chiens
              </label>
              <select
                className="rounded-xl border-[3px] border-white bg-white text-base p-2 focus:border-primary focus:ring-primary"
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
              <label className="text-lg font-medium text-stone-600 mb-2">
                Compatible avec les chats
              </label>
              <select
                className="rounded-xl border-[3px] border-white bg-white text-base p-2 focus:border-primary focus:ring-primary"
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
              <label className="text-lg font-medium text-stone-600 mb-2">
                Compatible avec les enfants
              </label>
              <select
                className="rounded-xl border-[3px] border-white bg-white text-base p-2 focus:border-primary focus:ring-primary"
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

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="mt-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {activeFilters.map((filter) => (
                  <span
                    key={filter.key}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-white"
                  >
                    {filter.value}
                    <button
                      onClick={() => removeFilter(filter.key)}
                      className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-white/20"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <button
                onClick={clearFilters}
                className="text-sm text-stone-600 hover:text-stone-800 underline"
              >
                Effacer tous les filtres
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
