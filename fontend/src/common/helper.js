
const backendDomain = "http://localhost:8080"

const SummaryApi = {
    //auth api
    SignUp : {
        url : `${backendDomain}/api/signup`,
        method: "post"
    },
    Login : {
        url : `${backendDomain}/api/login`,
        method : "post"
    },
    current_user: {
        url : `${backendDomain}/api/user-details`,
        method: "get"
    },
    logout_user : {
        url : `${backendDomain}/api/userLogout`,
        method: "get"
    },
    // crud user api
    all_users : {
        url : `${backendDomain}/api/all-users`,
        method: "get"
    },
    update_user: {
        url : `${backendDomain}/api/update-user`,
        method: 'put'
    },
    delete_user : {
        url : `${backendDomain}/api/delete-user`,
        method: 'delete'
    },
    add_user : {
        url :  `${backendDomain}/api/add-users`,
        method: 'post'
    },

    // crud product
    add_product : {
        url : `${backendDomain}/api/add-products`,
        method: 'post'
    },
    all_product: {
        url: `${backendDomain}/api/product-list`,
        method: 'get'
    },
    delete_product : {
        url: `${backendDomain}/api/delete-product`,
        method: 'delete'
    }
    
}

export default SummaryApi;