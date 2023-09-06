import React from "react";
import styles from "./CampaignCard.module.scss"
import Image from "next/image";

const CampaignCard = (props) => {
    const { campaign } = props;

    return (
        <div className={"border my-2 d-flex flex-column " + styles.card} >
            <div className={styles.banner}>
                <Image src={campaign.banner} alt="banner" fill={true} />
            </div>
            <div className={"mx-2 " + styles.body}>
                <div className={"my-2 d-flex align-items-center " + styles.title}>
                    <div className={"border border-dark h-100 w-25 " + styles.logo}>
                        <Image src={campaign.logo} alt="logo" fill={true} />
                    </div>
                    <span className={"px-2 fw-bold overflow-hidden " + styles.name}> {campaign.name} </span>
                </div>
                <div className={"my-4 overflow-hidden " + styles.description}>
                    <p>
                        {campaign.description}
                    </p>
                </div>
                <div className="progress mt-3 mb-2">
                    <div className={"progress-bar " + styles.progressBar} role="progressbar" style={{ width: campaign.raised / campaign.target * 100 + "%" }} aria-valuenow={campaign.raised} aria-valuemin="0" aria-valuemax={campaign.target}>
                    </div>
                </div>
                <div className="w-50 d-inline-block text-start">
                    <p className={"my-0 fw-bold " + styles["text-orange"]}> {campaign.currency} {campaign.raised}</p>
                    <p className={"my-0 " + styles["text-orange"]}> Raised </p>
                </div>
                <div className="w-50 d-inline-block text-end">
                    <p className="my-0 fw-bold"> {campaign.currency} {campaign.target}</p>
                    <p className="my-0"> Target </p>
                </div>
                <div className="d-flex flex-wrap my-3">
                    {campaign.tags.map((tag) => (
                        <div className={"me-2 fw-bold " + styles["text-orange"]}> #{tag} </div>
                    ))}
                </div>
                <button type="button" className={"btn text-white fw-bold position-absolute bottom-0 my-3 " + styles.investBtn}> Invest Now </button>
            </div>
        </div>
    );
};

export default CampaignCard;