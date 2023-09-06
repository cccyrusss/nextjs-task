import { React, useState } from "react";
import CampaignCard from "./CampaignCard"
import useSWR from "swr"
import styles from "./PaginatedCampaigns.module.scss"

const fetcher = (...args) => fetch(...args).then(res => res.json());

const PaginatedCampaigns = (props) => {
    const [page, setPage] = useState(1);
    const { query } = props;

    let filterQuery = "";
    if (query.filterBy) {
        filterQuery += "&" + query.filterBy + "=" + query.value;
        if (page != 1) {
            setPage(1);
        }
    }

    console.log(filterQuery);

    const { data, error, isLoading } = useSWR("/api/campaigns?page=" + page + filterQuery, fetcher)

    if (error) {
        return (
            <div className={"d-flex justify-content-center " + styles.campaigns}>
                Failed to load...
            </div>
        );
    }

    if (isLoading) return (
        <div className={"d-flex justify-content-center " + styles.campaigns} role="status">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )

    // console.log(data);
    const maxPage = Math.ceil(data.total / 4);

    // Nothing found
    if (data.total === 0) {
        return (
            <div className={"d-flex justify-content-center " + styles.campaigns}>
                Nothing found...
            </div>
        );
    }

    // Renders campaigns
    return (
        <>
            <div className={"d-flex flex-wrap justify-content-center " + styles.campaigns}>
                {data.campaigns.map((campaign) => (
                    <div className="mx-2">
                        <CampaignCard campaign={campaign}></CampaignCard>
                    </div>
                ))}
            </div >
            <nav className="py-3" aria-label="Page navigation">
                <div className={"pagination justify-content-center " + styles.pagination}>
                    <div className={"page-item" + (page > 1 ? "" : " disabled")}>
                        <button className="page-link px-3" onClick={() => setPage(page - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </div>
                    {Array(maxPage).fill(0).map((_, i) => (
                        <div className={"page-item " + (i == page - 1 ? styles.activePage : " ")}>
                            <button className="page-link px-3" onClick={() => setPage(i + 1)}>
                                {i + 1}
                            </button>
                        </div>
                    ))}
                    <div className={"page-item" + (page < maxPage ? "" : " disabled")}>
                        <button className="page-link px-3" onClick={() => setPage(page + 1)}>
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default PaginatedCampaigns;