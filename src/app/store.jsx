import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import uploadReducer from "../features/upload/uploadSlice";
import contactFormReducer from "../features/contactusform/contactFormSlice";
import addressReducer from "../features/addressed/addressSlice";
import phoneReducer from "../features/phone/phoneSlice";
import emailReducer from "../features/emails/emailSlice";
import programmeReducer from "../features/programme/programmeSlice";
import ourTeamReducer from "../features/ourTeam/ourTeamSlice";
import galleryReducer from "../features/gallery/gallerySlice";
import socMediaReducer from "../features/socialMedia/socialSlice";
import testimonialReducer from "../features/testimonial/testimonialSlice";
import numCountReducer from "../features/numCount/numSlice";
import mapReducer from "../features/map/mapSlice";
import aboutReducer from "../features/aboutCont/aboutContSlice";
import missionReducer from "../features/mission/missionSlice";
import visionReducer from "../features/vision/visionSlice";
import serviceReducer from "../features/services/serSlice";
import subServReducer from "../features/serviceSub/serSubSlice";
import upTeamReducer from "../features/upTeam/upTeamSlice";
import faqReducer from "../features/faq/Faqslice";
import blogReducer from "../features/blog/BlogSlice";
import crowdfundingReducer from "../features/crowdfunding/crowdfundingSlice";
import memberReducer from "../features/membership/membershipSlice";
import rescueReducer from "../features/rescuestory/rescuestoryslice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import needsReducer from "../features/needs/needSlice";
import productReducer from "../features/products/ProductSlice";
// donation razorpay integration
import donationReducer from "../features/donation/donationSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    upload: uploadReducer,
    contactForm: contactFormReducer,
    address: addressReducer,
    phone: phoneReducer,
    email: emailReducer,
    programme: programmeReducer,
    ourTeam: ourTeamReducer,
    gallery: galleryReducer,
    socMedia: socMediaReducer,
    testimonial: testimonialReducer,
    numCount: numCountReducer,
    map: mapReducer,
    about: aboutReducer,
    mission: missionReducer,
    vision: visionReducer,
    service: serviceReducer,
    subServ: subServReducer,
    upTeam: upTeamReducer,
    faq: faqReducer,
    blog: blogReducer,
    crowdfunding: crowdfundingReducer,
    members: memberReducer,
    rescue: rescueReducer,
    wishlist: wishlistReducer,
    needs: needsReducer,
    product: productReducer,
    // donation razorpay integration
    donation: donationReducer,
  },
});
