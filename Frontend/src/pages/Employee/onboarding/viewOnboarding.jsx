import React from "react";

const ViewOnboarding = ({ theEditData, handleClose }) => {

    return (
        <>
          Name :  {theEditData.firstName} {theEditData.lastName} <br />
          Mobile :  {theEditData.mobileNo} <br />
          Email :  {theEditData.email} <br />
          Mobile :  {theEditData.mobileNo} <br />
          Email :  {theEditData.email} <br />

        </>
    )
}

export default ViewOnboarding