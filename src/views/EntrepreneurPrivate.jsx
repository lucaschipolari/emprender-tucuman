import React from "react";
import EntrepreneurProfile from "../components/EntrepreneurProfile/EntrepreneurProfile";
import Options from "../components/EntrepreneurProfile/Options";
import PublicationCard from "../components/EntrepreneurProfile/PublicationCard";

const EntrepreneurPrivate = () => {
  return (
    <div>
      <EntrepreneurProfile />
      <Options />
      <div className="row m-1">
        <PublicationCard />
        <PublicationCard />
        <PublicationCard />
        <PublicationCard />
        <PublicationCard />
        <PublicationCard />
        <PublicationCard />
        <PublicationCard />
        <PublicationCard />
        <PublicationCard />
      </div>
    </div>
  );
};

export default EntrepreneurPrivate;
