import { After, AfterAll, BeforeAll } from "@cucumber/cucumber";
import {
  addRowExcel,
  cleanErrorMessage,
  createExcel,
  executePythonScript,
} from "../utils/utils";
import constants from "../tests/constants/constants";
BeforeAll(async function () {
  await createExcel(constants.EXCEL_HEADERS, constants.EXCEL_FILE_NAME);
});
After(async function (scenario: any) {
  const steps = scenario.pickle.steps.map((step: any) => {
    return step.text;
  });
  const tags = scenario.pickle.tags.map((tag: any) => {
    return tag.name;
  });
  let failure;
  if (scenario.result.status === "FAILED") {
    failure = cleanErrorMessage(scenario.result.message);
  } else {
    failure = "";
  }
  let object: any = {
    id: scenario.pickle.id,
    featureName: scenario.gherkinDocument.feature.name,
    name: scenario.pickle.name,
    uri: scenario.pickle.uri,
    tags: tags,
    steps: steps,
    status: scenario.result.status,
    duration: scenario.result.duration.nanos,
    retried: scenario.willBeRetried,
    failure: failure,
  };
  await addRowExcel(object, constants.EXCEL_FILE_NAME);
});
AfterAll(() => {
  executePythonScript("reportGeneration.py");
});
