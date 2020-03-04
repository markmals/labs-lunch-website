declare interface Restaurant {
    name: string
    cuisine: string
    menu: string
    placeID: string
    tested: boolean
    vegetarian: boolean
    location: {
        latitude: number
        longitude: number
    }
}
