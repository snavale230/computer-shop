import axios from "axios";
// const domainURL = "https://dev-arthaleap.cloudjiffy.net";
const domainURL = "";

const loginAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL + "/shree-computer-shop/user-login",
            requestBody,
            {
                withCredentials: true
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const addProductAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL + "/shree-computer-shop/add-product",
            requestBody,
            {
                withCredentials: true
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const existingSessionApplyAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL + "/personal-loan/checking-existing-application",
            requestBody,
            {
                withCredentials: true
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const verifyOtpAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/authn/val",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};


const fetchAllLoanApplicationsAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/all-loan-applications', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const createLoanApplicationAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/create-loan-application', {
            withCredentials: true,
        } );
        return response.data;
    } catch ( error ) {
        console.log('error error',error)
        throw error;
    }
};

const userDetailsAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/user/details', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const updatePersonalDetailsAPI = async ( requestBody ) => {
    try {
        console.log( typeof requestBody );
        const response = await axios.post( domainURL +
            "/personal-loan/update-personal-details",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const decisionEngine1API = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/decision-engine1",
            JSON.stringify( requestBody ),

            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const preDe1CallAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/pre-de1-call', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const storeDecisionEngine1DetailsAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/store-decision-engine1-details",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const fetchAddressAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/fetch-address', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};
const storeAddressDetailsAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/store-address-details",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};
const fetchAddressVintageAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/fetch-data",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const getImageMapAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/image-match-get', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const imageMatchAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/image-match-api",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const cibilAPI = async () => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/cibil-api-call",
            JSON.stringify( {} ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const validateUAN = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/validate-uan', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const uploadAisReport = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/upload-ais-report",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const getEmployeeHistory = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/get-employee-history', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const accountAggregatorAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/account-aggregator-or-bank-statement', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const storeEmployeeHistoryAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/store-employee-history",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};


const emailVerificationAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/email-verification",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const emailOTPValidationAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/email-otp-validation",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const getBankStatementAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/get-bank-names-for-ui', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const bankStatementAPI = async ( payload ) => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/bank-statement-analysis",
            JSON.stringify( payload ),
            {
                withCredentials: true,
            },
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const initiateKycAutoAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/initiate-kyc-auto",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const aadhaarOtpValidationAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/aadhaar-otp-validation",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const getBankNamesForUiAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/get-bank-names-for-ui', {
            withCredentials: true,
        } );
        return response.data;
    } catch ( error ) {
        throw error;
    }
};

const bankStatementAnalysisAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/bank-statement-analysis",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const loanOffersInfo = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/loan-offers-info', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const acceptedLoanOfferAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/accepted-loan-offer",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const sanctionLetterAndMitcGenerationAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/sanction-letter-and-mitc-generation', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const signOut = async () => {
    try {

        const response = await axios.get( domainURL + '/authn/sign-out', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const sanctionLetterMitcInfoAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/sanction-letter-mitc-info', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const getDocumentDataByDocumentIdAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/get-document-data-by-document-id",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const vkycFetchUrlAPI = async ( headers ) => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/vkyc-fetch-url', {
            headers,
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const vkycSkipAPI = async ( headers ) => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/vkyc-skip', {
            headers,
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const accountDetailsGetAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/account-details-get', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const bankaccountVerificationCallAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/bankaccount-verification-call",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const enachGetDetailsAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/enach-get-details', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const initiateENachApi = async () => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/initiate-e-nach-api",
            JSON.stringify( {} ),
            {
                withCredentials: true,
            }
        );

        return response.data;
    } catch ( error ) {
        throw error;
    }
};

const check_eNachStatusAPI = async ( headers ) => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/check_e-nach-status', {
            headers,
            withCredentials: true,
        } );
        return response.data;
    } catch ( error ) {
        throw error;
    }
};

const loanDocketCreationAPI = async ( headers ) => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/loan-docket-creation', {
            headers,
            withCredentials: true,
        } );
        return response.data;
    } catch ( error ) {
        throw error;
    }
};

const getLoanDocketAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/get-loan-docket', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const emsignerEsignAPI = async ( headers ) => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/emsigner-esign', {
            headers,
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const fetchDistStateAPI = async ( data ) => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/fetch-dist-state",
            JSON.stringify( data ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const skipAisAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/skip-ais', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const skipBankAccountVerification = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/skip-penny-drop', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const skipEnachAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/skip-enach', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const integrationApi = async () => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/integration-api",
            JSON.stringify( {} ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const fetchProfessionalDetailsAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/get-professional-details', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const routeBankOrAccountStatementAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/account-aggregator-or-bank-statement', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const fetchDataAPI = async ( apiPayload ) => {
    try {
        const response = await axios.post(domainURL +
            "/personal-loan/fetch-data",
            JSON.stringify(apiPayload),
            {
                withCredentials: true,
            }
        );

        return response.data;

    } catch ( error ) {
        console.error( "Error fetching address vintage:", error );
    }
};

const fetchDataBusinessAPI = async ( apiPayload ) => {
    try {
        const response = await axios.post(domainURL +
            "/business-loan/fetch-data",
            JSON.stringify(apiPayload),
            {
                withCredentials: true,
            }
        );

        return response.data;

    } catch ( error ) {
        console.error( "Error fetching address vintage:", error );
    }
};

const storeProfessionalDetailsAPI = async (payload) => {
    try {

        const response = await axios.post( domainURL +
            "/personal-loan/store-professional-details",
            JSON.stringify(payload),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const storeItrAPI = async ( payload ) => {
    try {
        const response = await axios.post(domainURL +
            "/personal-loan/get-itr-details",
            JSON.stringify(payload),
            {
                withCredentials: true,
            }
        );

        return response;

    } catch ( error ) {
        console.error( "Error fetching address vintage:", error );
    }
};

const fetchItrDetailsAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/personal-loan/fetch-itr-report', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const verifyGSTN = async ( payload ) => {
    try {
        const response = await axios.post(domainURL + "/personal-loan/gst-number-verification",
        JSON.stringify(payload),
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch ( error ) {
        throw error;
    }
  };

  const verifyUdyamNumber = async ( payload ) => {
    try {
        const response = await axios.post(domainURL + "/personal-loan/udyam-number-verification",
            JSON.stringify(payload),
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch ( error ) {
        throw error;
    }
};
//<<<--------------------------BUSINESS LOAN API ----------------------------------------------->>>

const businessLoanCreateLoanApplicationAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/business-loan/create-loan-application', {
            withCredentials: true,
        } );
        return response.data;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanUserDetailsAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/business-loan/user-details', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanUdyamVerificationAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/business-loan/udyam-aadhaar-validation",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanUpdatePersonalDetailsAPI = async ( requestBody ) => {
    try {
        console.log( typeof requestBody );
        const response = await axios.post( domainURL +
            "/business-loan/update-personal-details",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanPreDe1CallAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/business-loan/pre-de1-call', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};
const buisnessLoanFetchReferncesAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/business-loan/get-references-details', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};


const businessLoanDecisionEngine1API = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/business-loan/decision-engine-one-eligibility",
            JSON.stringify( requestBody ),

            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanStoreDecisionEngine1DetailsAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/business-loan/store-decision-engine-one-details",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanInitiateKycAutoAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/business-loan/initiate-kyc-auto",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanAadhaarOtpValidationAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/business-loan/aadhaar-otp-validation",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanFetchAddressAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/business-loan/fetch-address', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanStoreAddressDetailsAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/business-loan/store-address-details",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};
const businessLoanStoreReferncesAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/business-loan/store-references-details",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanFetchAddressVintageAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/business-loan/fetch-data",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanGetImageMapAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/business-loan/image-match-get', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanImageMatchAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/business-loan/image-match-api",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanCibilAPI = async () => {
    try {

        const response = await axios.post( domainURL +
            "/business-loan/cibil-api-call",
            JSON.stringify( {} ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanValidateUAN = async () => {
    try {

        const response = await axios.get( domainURL + '/business-loan/validate-uan', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanFetchProfessionalDetailsAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/business-loan/fetch-professional-details', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanStoreProfessionalDetailsAPI = async (payload) => {
    try {

        const response = await axios.post( domainURL +
            "/business-loan/store-professional-details",
            JSON.stringify(payload),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanVerifyGSTN = async ( payload ) => {
    try {
        const response = await axios.post(domainURL +
            "/business-loan/gst-number-verification",
            JSON.stringify(payload),
            {
                withCredentials: true,
            }
        );

        return response;

    } catch ( error ) {
        console.error( "Error fetching address vintage:", error );
    }
};

const businessLoanEmailVerification = async ( requestBody ) => {
    try {
        const response = await axios.post(domainURL +
            "/business-loan/email-verification",
            JSON.stringify(requestBody),
            {
                withCredentials: true,
            }
        );

        return response;

    } catch ( error ) {
        console.error( "Error fetching address vintage:", error );
    }
};

const businessLoanEmailOtpValidation = async ( requestBody ) => {
    try {
        const response = await axios.post(domainURL +
            "/business-loan/email-otp-validation",
            JSON.stringify(requestBody),
            {
                withCredentials: true,
            }
        );

        return response;

    } catch ( error ) {
        
        console.error( "Error fetching address vintage:", error );
    }
};

const businessLoanFetchItrDetailsAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/business-loan/fetch-itr-report', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};
const businessLoanFetchGstrDetailsAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/business-loan/fetch-gstin', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};


const businessLoanFetchDataAPI = async ( apiPayload ) => {
    try {
        const response = await axios.post(domainURL +
            "/business-loan/fetch-data",
            JSON.stringify(apiPayload),
            {
                withCredentials: true,
            }
        );

        return response.data;

    } catch ( error ) {
        console.error( "Error fetching address vintage:", error );
    }
};

const businessLoanStoreItrAPI = async ( payload ) => {
    try {
        const response = await axios.post(domainURL +
            "/business-loan/get-itr-details",
            JSON.stringify(payload),
            {
                withCredentials: true,
            }
        );

        return response.data;

    } catch ( error ) {
        console.error( "Error fetching address vintage:", error );
    }
};
const businessLoanStoreGstrAPI = async ( payload ) => {
    try {
        const response = await axios.post(domainURL +
            "/business-loan/gst-return",
            JSON.stringify(payload),
            {
                withCredentials: true,
            }
        );

        return response;

    } catch ( error ) {
        console.error( "Error fetching address vintage:", error );
    }
};

const businessLoanGetBankStatementAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/business-loan/get-bank-names-for-ui', {
            withCredentials: true,
        } );
        return response.data;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanBankStatementAnalysisAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/business-loan/bank-statement-analysis",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanIntegrationApi = async () => {
    try {

        const response = await axios.post( domainURL +
            "/business-loan/integration-api",
            JSON.stringify( {} ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanAcceptedLoanOfferAPI = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/business-loan/accepted-loan-offer",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanLoanOffersInfo = async () => {
    try {

        const response = await axios.get( domainURL + '/business-loan/loan-offers-info', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanSanctionLetterAndMitcGenerationAPI = async () => {
    try {

        const response = await axios.get( domainURL + '/business-loan/sanction-letter-and-mitc-generation', {
            withCredentials: true,
        } );
        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanFetchBusinessIncomeDetails = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/business-loan/fetch-income-assesment",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

const businessLoanStoreBusinessIncomeDetails = async ( requestBody ) => {
    try {

        const response = await axios.post( domainURL +
            "/business-loan/store-income-assesment",
            JSON.stringify( requestBody ),
            {
                withCredentials: true,
            }
        );

        return response;
    } catch ( error ) {
        throw error;
    }
};

export {businessLoanStoreBusinessIncomeDetails,existingSessionApplyAPI,businessLoanFetchBusinessIncomeDetails,fetchDataBusinessAPI,businessLoanSanctionLetterAndMitcGenerationAPI,businessLoanLoanOffersInfo,businessLoanAcceptedLoanOfferAPI,businessLoanIntegrationApi,businessLoanBankStatementAnalysisAPI,businessLoanGetBankStatementAPI,verifyUdyamNumber,businessLoanStoreGstrAPI,verifyGSTN,skipBankAccountVerification,bankStatementAPI,getBankStatementAPI,fetchItrDetailsAPI,storeItrAPI,routeBankOrAccountStatementAPI,storeProfessionalDetailsAPI,fetchDataAPI,fetchProfessionalDetailsAPI,buisnessLoanFetchReferncesAPI,businessLoanFetchDataAPI,businessLoanFetchItrDetailsAPI,businessLoanFetchGstrDetailsAPI,businessLoanStoreItrAPI,businessLoanStoreReferncesAPI,businessLoanEmailOtpValidation,businessLoanEmailVerification,businessLoanVerifyGSTN,businessLoanStoreProfessionalDetailsAPI,businessLoanFetchProfessionalDetailsAPI,businessLoanGetImageMapAPI,businessLoanImageMatchAPI,businessLoanCibilAPI,businessLoanValidateUAN,businessLoanFetchAddressVintageAPI,businessLoanStoreAddressDetailsAPI,businessLoanFetchAddressAPI,businessLoanAadhaarOtpValidationAPI,businessLoanInitiateKycAutoAPI,businessLoanStoreDecisionEngine1DetailsAPI,businessLoanDecisionEngine1API,businessLoanPreDe1CallAPI,businessLoanUpdatePersonalDetailsAPI,businessLoanUdyamVerificationAPI,businessLoanUserDetailsAPI,businessLoanCreateLoanApplicationAPI, emailOTPValidationAPI, emailVerificationAPI, accountAggregatorAPI, signOut, integrationApi, skipEnachAPI, skipAisAPI, fetchDistStateAPI, emsignerEsignAPI, getLoanDocketAPI, loanDocketCreationAPI, check_eNachStatusAPI, initiateENachApi, enachGetDetailsAPI, bankaccountVerificationCallAPI, accountDetailsGetAPI, vkycSkipAPI, vkycFetchUrlAPI, getDocumentDataByDocumentIdAPI, sanctionLetterMitcInfoAPI, sanctionLetterAndMitcGenerationAPI, acceptedLoanOfferAPI, loanOffersInfo, bankStatementAnalysisAPI, getBankNamesForUiAPI, aadhaarOtpValidationAPI, initiateKycAutoAPI, storeEmployeeHistoryAPI, getEmployeeHistory, uploadAisReport, validateUAN, cibilAPI, imageMatchAPI, getImageMapAPI, fetchAddressVintageAPI, storeAddressDetailsAPI, addProductAPI,loginAPI, verifyOtpAPI, createLoanApplicationAPI,fetchAllLoanApplicationsAPI, userDetailsAPI, updatePersonalDetailsAPI, decisionEngine1API, preDe1CallAPI, storeDecisionEngine1DetailsAPI, fetchAddressAPI };
