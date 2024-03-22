export const useTracker = () => {
    const generatedData = (data: any, statusToIcon: any) => {
        const sortedDataTracker = data.sort((a: any, b: any) => {
            const dateA: any = new Date(a.date)
            const dateB: any = new Date(b.date)
            return dateB - dateA // Urutkan dari tanggal terbaru ke terlama
        })
        const dataWithIcon = sortedDataTracker.map((x: any) => ({
            ...x,
            icon: statusToIcon[x.statusShipment] || '',
        }))

        return dataWithIcon
    }

    return { generatedData }
}
