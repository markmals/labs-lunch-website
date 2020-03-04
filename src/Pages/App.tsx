import * as React from "react"

import { Spinner, Container } from "react-bootstrap"
import "../Assets/bootstrap.css"

import { FirebaseAppProvider, SuspenseWithPerf } from "reactfire"
import config from "../Resources/FirebaseConfig.json"

import RestaurantsTable from "../Components/RestaurantsTable"
import SubmitRestaurant from "../Components/SubmitRestaurant"

const Loading = () => (
    <div className="d-flex justify-content-center">
        <Spinner animation="border" />
    </div>
)

const App = () => {
    return (
        <Container className="p-3">
            <FirebaseAppProvider firebaseConfig={config}>
                <h1 className="text-center">
                    {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                    <span role="img">📎🥪</span>
                </h1>

                <SuspenseWithPerf
                    fallback={<Loading />}
                    traceId="load-lunch-table"
                >
                    {/* <RestaurantsTable /> */}
                    <SubmitRestaurant />
                </SuspenseWithPerf>
            </FirebaseAppProvider>
        </Container>
    )
}

export default App
