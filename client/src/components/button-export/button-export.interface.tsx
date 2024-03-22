/* eslint-disable no-unused-vars */
export interface IButtonExport {
    data: any[]
    module: string
    headers: any[]
    onExport?: () => void
    exportType: 'pdf' | 'xlxs'
    getDataGenerate: any
    generateReportData: any
}

export interface IHeaderExport {
    accessor: string
    label: string
    customBuild?: (data: string) => React.ReactElement | string
    styleXlxs?: any
    widthCol?: string
}
