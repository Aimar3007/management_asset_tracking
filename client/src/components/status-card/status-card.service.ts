export const getStatusClass = (
    status: string,
): { bgClass: string; textClass: string; lineClass: string } => {
    let retClass: { bgClass: string; textClass: string; lineClass: string }

    switch (status) {
        case 'Open':
        case 'Confirmed':
            retClass = {
                bgClass: 'bg-logistical-green-ver4',
                textClass: 'text-logistical-green-dark-ver1',
                lineClass: 'bg-logistical-green-dark-ver1',
            }
            break
        case 'In Progress':
            retClass = {
                bgClass: 'bg-logistical-yellow-ver1',
                textClass: 'text-logistical-yellow-dark-ver1',
                lineClass: 'bg-logistical-yellow-dark-ver1',
            }

            break
        case 'Canceled':
            retClass = {
                bgClass: 'bg-logistical-red-light',
                textClass: 'text-logistical-red-dark-ver1',
                lineClass: 'bg-logistical-red-dark-ver1',
            }

            break

        default:
            retClass = {
                bgClass: 'bg-logistical-gray-ver5',
                textClass: 'text-logistical-gray-ver4',
                lineClass: 'bg-logistical-gray-ver4',
            }
            break
    }
    return retClass
}
