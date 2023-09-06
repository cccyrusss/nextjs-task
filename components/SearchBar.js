import { React, useState } from "react";
import { Formik, Field, Form } from "formik";
import styles from "./SearchBar.module.scss"

const SearchBar = (props) => {
    const searchMethods = [{ displayName: "Campaign Name", value: "name" }, { displayName: "Campaign Tag", value: "tag" }];
    const [filterBy, setFilterBy] = useState(searchMethods[0]);
    const { search } = props;

    return (
        <div className={"d-flex fixed-top align-items-end " + styles.top} >
            <div className={"d-flex w-100 px-3 justify-content-center " + styles.bar}>
                {/* Home button to refresh content */}
                <button className={"btn border " + styles.home} onClick={() => window.location.reload()}>
                    <i className="bi bi-house"></i>
                </button>
                <div className="dropdown">
                    <button className={"btn dropdown-toggle border " + styles.dropdownBtn} data-bs-toggle="dropdown" type="button" id="dropdownMenuButton" aria-expanded="false">
                        {filterBy.displayName}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {searchMethods.map((method) => (
                            <li><a className="dropdown-item" onClick={() => setFilterBy(method)}> {method.displayName} </a></li>
                        ))}
                    </ul>
                </div>
                <div className={styles.searchField}>
                    <Formik
                        initialValues={{ query: "" }}
                        onSubmit={(values, { resetForm }) => {
                            search({ value: values.query, filterBy: filterBy.value });
                            resetForm();
                        }}
                    >
                        <Form className="d-flex">
                            <Field className={"px-2 border " + styles.input} name="query" />
                            <button type="submit" className={"btn border " + styles.searchBtn}>
                                <i className="bi bi-search"></i>
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div >
    );
}

export default SearchBar;