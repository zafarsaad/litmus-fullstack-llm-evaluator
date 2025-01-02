const DefinedExperiments = () => {
  const sampleTestCases = [
    {
      testName: "fake test 01",
      testPrompt: "Give me 10 synonyms for the word build",
      gradeType: "partial match",
    },
    {
      testName: "fake test 02",
      testPrompt: "Can you generate an image of a cat making spagetti?",
      gradeType: "partial match",
    },
    {
      testName: "fake test 03",
      testPrompt: "Give me 10 synonyms for the word build",
      gradeType: "partial match",
    },
  ];

  const setExperiments = [
    {
      experimentName: "Experiment Alpha",
      testCase: [...sampleTestCases],
      gradeType: "partial match",
    },
  ];

  return (
    <div className="border p-1 mt-4">
      <div>Pre-defined Experiments</div>
      <div>
        <ul>
          <li>Experiment | Test Name | Test Prompt | Grade Type</li>
          {setExperiments.map((ex) => (
            <li
              className="p-1 bg-slate-800 flex flex-wrap "
              key={ex.experimentName}
            >
              {ex.experimentName} |{ex.testCase[0].testName} |{" "}
              {ex.testCase[0].testPrompt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DefinedExperiments;
