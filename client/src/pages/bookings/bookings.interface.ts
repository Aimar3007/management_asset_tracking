export interface IBookings {
    statusTransaction: string
    transportMode: string
    bookingDate: string
    bookingNo: number | string
    shipper: string
    shipperRef: string
    shipperContact: string
    orderNumber: string
    shipperCodAmount: string
    origin: string
    etd: string
    destination: string
    eta: string
    consignee: string
    consigneeContact: string
    packs: string
    weight: string
    volume: string
    vessel: string
    voyageFlight: string
    goodsValue: string
    insuranceValue: string
    serviceLevel: string
    paymentTerm: string
    billing: string
    goodsDescription: string
    detailedDescription: string
    notes: string
    specialInstructions: string
    marksNumber: string
}
export interface IAdditionalInformation {
    pickupAddress: string
    estimatedPickup: string
    requiredPickUp: string
    pickupEquipment: string
    pickupAgent: string
    deliveryAddress: string
    estimatedDelivery: string
    deliveryRequiredBy: string
    cartageDropMode: string
    deliveryAgent: string
    chargesApply: string
    releaseType: string
    onBoard: string
}
export interface IDetailData {
    title: string
    value: string
}