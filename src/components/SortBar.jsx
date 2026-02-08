export default function SortBar({ sort, setSort }) {
  return (
    <div className="sort-bar">
      <span>Sort by:</span>

      <select
        value={sort.field}
        onChange={(e) =>
          setSort((prev) => ({ ...prev, field: e.target.value }))
        }
      >
        <option value="created_at">Date</option>
        <option value="username">User</option>
        <option value="email">Email</option>
      </select>

      <select
        value={sort.order}
        onChange={(e) =>
          setSort((prev) => ({ ...prev, order: e.target.value }))
        }
      >
        <option value="DESC">DESC</option>
        <option value="ASC">ASC</option>
      </select>
    </div>
  )
}