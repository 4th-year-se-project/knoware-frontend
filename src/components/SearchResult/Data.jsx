let myGraph = {
  nodes: [
    {
      id: "n1",
      label: "Topic",
      description:
        "Over the past two decades, several information exploration ap- proaches were suggested to support a special category of search tasks known as exploratory search. These approaches creatively combined search, browsing, and information analysis steps shifting user efforts from recall (formulating a query) to recognition (i.e., selecting a link) and helping them to gradually learn more about the explored domain. More recently, a few projects demonstrated that personalising the process of information exploration with models of user interests can add value to information exploration systems.",
      color: "transparent",
    },
    {
      id: "n2",
      label: "Introduction to Data Analytics",
      description:
        "Over the past two decades, several information exploration ap- proaches were suggested to support a special category of search tasks known as exploratory search. These approaches creatively combined search, browsing, and information analysis steps shifting user efforts from recall (formulating a query) to recognition (i.e., selecting a link) and helping them to gradually learn more about the explored domain. More recently, a few projects demonstrated that personalising the process of information exploration with models of user interests can add value to information exploration systems.",
      color: "transparent",
    },
    {
      id: "n3",
      label: "Getting to Know Your Data",
      description:
        "Over the past two decades, several information exploration ap- proaches were suggested to support a special category of search tasks known as exploratory search. These approaches creatively combined search, browsing, and information analysis steps shifting user efforts from recall (formulating a query) to recognition (i.e., selecting a link) and helping them to gradually learn more about the explored domain. More recently, a few projects demonstrated that personalising the process of information exploration with models of user interests can add value to information exploration systems.",

      color: "transparent",
    },
    {
      id: "n4",
      label: "Knowledge Representation",
      description:
        "Over the past two decades, several information exploration ap- proaches were suggested to support a special category of search tasks known as exploratory search. These approaches creatively combined search, browsing, and information analysis steps shifting user efforts from recall (formulating a query) to recognition (i.e., selecting a link) and helping them to gradually learn more about the explored domain. More recently, a few projects demonstrated that personalising the process of information exploration with models of user interests can add value to information exploration systems.",
      color: "transparent",
    },
    {
      id: "n5",
      label: "Association Rule Mining",
      description:
        "Over the past two decades, several information exploration ap- proaches were suggested to support a special category of search tasks known as exploratory search. These approaches creatively combined search, browsing, and information analysis steps shifting user efforts from recall (formulating a query) to recognition (i.e., selecting a link) and helping them to gradually learn more about the explored domain. More recently, a few projects demonstrated that personalising the process of information exploration with models of user interests can add value to information exploration systems.",
      color: "transparent",
    },
    { id: "n6", label: "pdf" },

    { id: "n7", label: "pdf" },
    { id: "n8", label: "pdf" },
  ],

  edges: [
    { id: "e1", source: "n1", target: "n2", label: "SEES", color: "green" },
    { id: "e2", source: "n1", target: "n3", label: "SEES", color: "green" },
    {
      id: "e3",
      source: "n1",
      target: "n4",
      label: "SEES",
      color: "green",
    },
    {
      id: "e4",
      source: "n1",
      target: "n5",
      label: "SEES",
      color: "green",
    },

    {
      id: "e6",
      source: "n2",
      target: "n6",
      label: "SEES",
      color: "black",
    },
    {
      id: "e7",
      source: "n2",
      target: "n7",
      label: "SEES",
      color: "black",
    },
    {
      id: "e8",
      source: "n2",
      target: "n8",
      label: "SEES",
      color: "black",
    },
  ],
};

export default myGraph;
