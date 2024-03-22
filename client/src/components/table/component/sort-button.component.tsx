interface ISortButton {
    sortOrder: 'asc' | 'desc'
    columnKey: string
    sortKey: string

    // eslint-disable-next-line no-unused-vars
    onClick: (accessor: string) => void
}

const SortButton = ({
    sortOrder,
    columnKey,
    sortKey,
    onClick,
}: ISortButton) => {
    const isActive = sortKey === columnKey
    return (
        <button
            onClick={() => onClick(columnKey)}
            className={`sort-button ${
                isActive
                    ? 'border-logistical-blue-ver2'
                    : 'border-logistical-gray-ver2'
            }`}
        >
            <i
                className={`${
                    sortKey !== columnKey
                        ? 'ri-subtract-line'
                        : sortKey === columnKey && sortOrder === 'desc'
                        ? 'ri-arrow-down-s-fill active'
                        : ''
                }`}
            ></i>
            <i
                className={`${
                    sortKey !== columnKey
                        ? ''
                        : sortKey === columnKey && sortOrder === 'desc'
                        ? ''
                        : 'ri-arrow-up-s-fill active'
                }`}
            ></i>
        </button>
    )
}

export default SortButton
