import { request, APIRequestContext } from "@playwright/test";

export class ApiController {
  private async getApiContext(baseURL: string): Promise<APIRequestContext> {
    return await request.newContext({ baseURL: baseURL });
  }

  public async getMethodWithoutParams(uri: string, baseURL: string) {
    const context = await this.getApiContext(baseURL);
    const response = await context.get(uri);
    return response;
  }

  public async getMethodWithParams(params: any, uri: string, baseURL: string) {
    const context = await this.getApiContext(baseURL);
    const response = await context.get(uri, { params });
    return response;
  }

  public async getMethodWithParamsAndAuthToken(
    params: any,
    uri: string,
    baseURL: string,
    token: string
  ) {
    const context = await this.getApiContext(baseURL);
    const response = await context.get(uri, {
      params: params,
      headers: {
        Authorization: `Basic ${token}`,
        Accept: "application/json",
      },
    });
    return response;
  }

  public async postNewObjectNoToken(body: any, uri: string, baseURL: string) {
    const context = await this.getApiContext(baseURL);
    const response = await context.post(uri, {
      data: body,
    });
    return response;
  }

  public async postNewObjectWithToken(
    body: any,
    uri: string,
    baseURL: string,
    token: string
  ) {
    const context = await this.getApiContext(baseURL);
    const response = await context.post(uri, {
      data: body,
      headers: {
        Authorization: `Basic ${token}`,
        Accept: "application/json",
      },
    });
    return response;
  }

  public async putEditObjectWithToken(
    body: any,
    uri: string,
    baseURL: string,
    token: string
  ) {
    const context = await this.getApiContext(baseURL);
    const response = await context.put(uri, {
      data: body,
      headers: {
        Authorization: `Basic ${token}`,
        Accept: "application/json",
      },
    });
    return response;
  }

  public async patchEditObjectWithToken(
    body: any,
    uri: string,
    baseURL: string,
    token: string
  ) {
    const context = await this.getApiContext(baseURL);
    const response = await context.patch(uri, {
      data: body,
      headers: {
        Authorization: `Basic ${token}`,
        Accept: "application/json",
      },
    });
    return response;
  }

  public async deleteObjectWithToken(
    uri: string,
    baseURL: string,
    token: string
  ) {
    const context = await this.getApiContext(baseURL);
    const response = await context.delete(uri, {
      headers: {
        Authorization: `Basic ${token}`,
        Accept: "application/json",
      },
    });
    return response;
  }

  public getRandomElementFromArray(array: any[]): number {
    const length = array.length;
    const randomIndex = Math.floor(Math.random() * length);
    return randomIndex;
  }

  public areAllElementsNumbers(array: any[]): boolean {
    return array.every((val) => typeof val === "number");
  }
}
