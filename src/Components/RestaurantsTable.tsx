import * as React from "react"
import { Table, Col } from "react-bootstrap"
import "../Assets/bootstrap.css"
import { useFirestore, useFirestoreCollectionData } from "reactfire"

/* eslint react/destructuring-assignment: "off" */
const RestaurantsTableRow = (props: {
    restaurant: Restaurant
    key: string
}) => (
    <tr>
        <td>{props.restaurant.name}</td>
        <td>{props.restaurant.cuisine}</td>
        <td>
            <a href={props.restaurant.menu}>View Menu</a>
        </td>
        <td>
            <a
                href={`https://www.google.com/maps/place/?q=place_id:${props.restaurant.placeID}`}
            >
                🗺
            </a>
        </td>
        <td>{props.restaurant.vegetarian ? "Yes" : "No"}</td>
    </tr>
)

const RestaurantsTable = () => {
    const restaurantsRef = useFirestore().collection("restaurants")
    const restaurants: Restaurant[] = useFirestoreCollectionData(restaurantsRef)

    return (
        <Col xs="12">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Cuisine</th>
                        <th>Menu</th>
                        <th>Google Maps</th>
                        <th>Vegetarian Options</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants.map(restaurant => (
                        <RestaurantsTableRow
                            restaurant={restaurant}
                            key={restaurant.name}
                        />
                    ))}
                </tbody>
            </Table>
        </Col>
    )
}

export default RestaurantsTable
