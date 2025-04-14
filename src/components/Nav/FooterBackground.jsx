import React from "react";
import PropTypes from "prop-types";
import footerImage from "../../assets/bkg/footer.png"; // Our default image
import FooterContent from "./FooterContent";

const FooterBackground = ({ image }) => {
  return (
    <div
      className="w-full h-[900px] flex flex-col justify-end pb-0"
      style={{
        backgroundImage: `url(${image || footerImage})`, // So we can use the default rocket laucnh image if no prop is passed
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <FooterContent />
    </div>
  );
};

FooterBackground.propTypes = {
  image: PropTypes.string,
};

export default FooterBackground;
