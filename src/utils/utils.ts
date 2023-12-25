import { request, APIRequestContext } from "@playwright/test";
const { PythonShell } = require("python-shell");
const ExcelJS = require("exceljs");
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("TestCases");
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

export async function createExcel(headers: string[], fileName: string) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Test-Report");
  // Agregar nombres en la primera fila
  worksheet.addRow(headers);
  // Guardar el archivo Excel inicial
  await workbook.xlsx.writeFile(fileName + ".xlsx");
  console.log("Sheet Created");
}
export async function addRowExcel(scenarioData: any, fileName: string) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(fileName + ".xlsx");
  const worksheet = workbook.getWorksheet("Test-Report");
  worksheet.addRow([
    scenarioData.id,
    scenarioData.featureName,
    scenarioData.name,
    scenarioData.uri,
    scenarioData.tags,
    scenarioData.steps,
    scenarioData.status,
    scenarioData.duration,
    scenarioData.retried,
    scenarioData.failure,
  ]);
  await workbook.xlsx.writeFile(fileName + ".xlsx");
  console.log("Sheet Updated");
}
export function cleanErrorMessage(error: string) {
  // Remove ANSI escape codes
  const withoutAnsiCodes = error.replace(/\x1B\[\d+m/g, "");

  // Split the message into lines
  const lines = withoutAnsiCodes.split("\n");

  // Filter out lines from the stack trace you don't want or just take the first few lines
  const filteredLines = lines.filter((line, index) => {
    // Example: Skip lines that are part of the internal modules, adjust according to your needs
    return !line.includes("node_modules/");
  });

  // Join the cleaned lines back into a single string
  return filteredLines.join("\n");
}

export function executePythonScript(scriptName: string) {
  PythonShell.run(scriptName, null, function (err: any, results: any) {
    if (err) throw err;
    console.log("Results From Python:", results);
  });
}
