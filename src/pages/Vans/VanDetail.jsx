import React, { Suspense } from "react";
import { Link, useParams, useLocation, useLoaderData, defer, Await } from "react-router-dom";
import { getVan } from "../../api";

export function loader({ params }) {
    return defer({ van: getVan(params.id) });
}

export default function VanDetail() {
    const location = useLocation()
    const vanPromise = useLoaderData();

    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    function renderVan(van) {
        return (
            <div className="van-detail">
                <img src={van.imageUrl} />
                <i className={`van-type ${van.type} selected`}>
                    {van.type}
                </i>
                <h2>{van.name}</h2>
                <p className="van-price"><span>${van.price}</span>/day</p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
            </div>
        )
    }

    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>

            <Suspense fallback={<h2>Loading van details...</h2>}>
                <Await resolve={vanPromise.van}>
                    {renderVan}
                </Await>
            </Suspense>
        </div>
    )
}