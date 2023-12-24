import { request } from "@playwright/test";


async function getApiContext(baseURL:string){
   return await  request.newContext({baseURL:baseURL})
}
async function getMethodWithoutParams(uri:string,baseURL:string){
    const context= await getApiContext(baseURL);
    const response = await context.get(uri)
    return response;
}
async function getMethodWithParams(params:any,uri:string,baseURL:string){
    const context= await getApiContext(baseURL);
    const response = await context.get(uri,{params})
    return response;
}
async function getMethodWithParamsAndAuthToken(params:any,uri:string,baseURL:string,token:string){
    const context= await getApiContext(baseURL);
    const response = await context.get(uri,{
            params:params,
            headers:{
            Authorization:`Basic ${token}`,
            Accept:"application/json"
        }
    });
    return response;
}
async function postNewObjectNoToken(body:any,uri:string,baseURL:string){
    const context= await getApiContext(baseURL);
    const response = await context.post(uri,{
        data:body,
});};
async function postNewObjectWithToken(body:any,uri:string,baseURL:string,token:string){
    const context= await getApiContext(baseURL);
    const response = await context.post(uri,{
        data:body,
        headers:{
            Authorization:`Basic ${token}`,
            Accept:"application/json"
        }
});

}
async function putEditObjectWithToken(body:any,uri:string,baseURL:string,token:string){
    const context= await getApiContext(baseURL);
    const response = await context.post(uri,{
        data:body,
        headers:{
            Authorization:`Basic ${token}`,
            Accept:"application/json"
        }
});};
async function patchEditObjectWithToken(body:any,uri:string,baseURL:string,token:string){
    const context= await getApiContext(baseURL);
    const response = await context.patch(uri,{
        data:body,
        headers:{
            Authorization:`Basic ${token}`,
            Accept:"application/json"
        }
    });
};
async function deleteObjectWithToken(body:any,uri:string,baseURL:string,token:string){
    const context= await getApiContext(baseURL);
    const response = await context.delete(uri,{
        headers:{
            Authorization:`Basic ${token}`,
            Accept:"application/json"
        }
});

}
export default  {
    get:{
        getMethodWithParams,
        getMethodWithParamsAndAuthToken,
        getMethodWithoutParams
    },
    post:{
        postNewObjectWithToken,
        postNewObjectNoToken
    },
    put:{
        putEditObjectWithToken
    },
    patch:{
        patchEditObjectWithToken
    },
    delete:{
        deleteObjectWithToken
    }
}