import React, { FunctionComponent } from "react"

import { Form, Button, Col } from "react-bootstrap"
import "../Assets/bootstrap.css"

import { Formik } from "formik"
import * as yup from "yup"

import { useFirestore } from "reactfire"

interface TextFieldProps {
    id: string
    value: string
    onChange?: any
    isValid?: boolean
}

/* eslint react/destructuring-assignment: "off" */
const FormTextField: FunctionComponent<TextFieldProps> = props => (
    <Form.Group as={Col} md="4" controlId={props.id}>
        <Form.Label>{props.children}</Form.Label>
        <Form.Control
            type="text"
            name={props.id}
            value={props.value}
            onChange={props.onChange}
            isValid={props.isValid}
        />
    </Form.Group>
)

const onSubmit = (values: {
    restaurantName: string
    cuisineType: string
    vegetarianOptions: boolean
    menuLink: string
}) => {
    const pendingRef = useFirestore().collection("pending")
    const docName = ""
    const data: any = {
        name: values.restaurantName,
        vegetarian: values.vegetarianOptions
    }

    if (values.cuisineType) data.cuisine = values.cuisineType
    if (values.menuLink) data.menu = values.menuLink

    pendingRef.doc(docName).set(data)
}

const SubmitRestaurant = () => {
    const schema = yup.object().shape({
        name: yup.string().required(),
        cuisine: yup.string(),
        menu: yup.string().url(),
        vegetarian: yup.bool().required()
    })

    return (
        <div>
            <h3 className="text-center">Submit A New Restaurant</h3>
            <Formik
                initialValues={{
                    restaurantName: "",
                    cuisineType: "",
                    vegetarianOptions: false,
                    menuLink: ""
                }}
                validationSchema={schema}
                onSubmit={onSubmit}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors
                }) => (
                    <Form>
                        <Form.Row>
                            <FormTextField
                                id="restaurantName"
                                value={values.restaurantName}
                                onChange={handleChange}
                                isValid={
                                    touched.restaurantName &&
                                    !errors.restaurantName
                                }
                            >
                                Restaurant name
                            </FormTextField>
                            <FormTextField
                                id="cuisineType"
                                value={values.cuisineType}
                                onChange={handleChange}
                                isValid={
                                    touched.cuisineType && !errors.cuisineType
                                }
                            >
                                Cuisine
                            </FormTextField>
                            <FormTextField
                                id="menuLink"
                                value={values.menuLink}
                                onChange={handleChange}
                                isValid={touched.menuLink && !errors.menuLink}
                            >
                                Link to menu
                            </FormTextField>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group>
                                <Form.Check
                                    custom
                                    type="checkbox"
                                    id="validationFormik04"
                                    label="Vegetarian options?"
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Button type="submit">Submit</Button>
                        </Form.Row>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SubmitRestaurant
