let myGraph = {
  nodes: [
    {
      id: "n1",
      label: "Data Analytics",
      description:
      "Over the past two decades, several information exploration ap- proaches were suggested to support a special category of search tasks known as exploratory search. These approaches creatively combined search, browsing, and information analysis steps shifting user efforts from recall (formulating a query) to recognition (i.e., selecting a link) and helping them to gradually learn more about the explored domain. More recently, a few projects demonstrated that personalising the process of information exploration with models of user interests can add value to information exploration systems.",
    },
    {
      id: "n2",
      label: "Introduction to Data Analytics",
      description:
      "Over the past two decades, several information exploration ap- proaches were suggested to support a special category of search tasks known as exploratory search. These approaches creatively combined search, browsing, and information analysis steps shifting user efforts from recall (formulating a query) to recognition (i.e., selecting a link) and helping them to gradually learn more about the explored domain. More recently, a few projects demonstrated that personalising the process of information exploration with models of user interests can add value to information exploration systems.",
    },
    {
      id: "n2.1",
      label: "Pdf",
      description:
        "Over the past two decades, several information exploration ap- proaches were suggested to support a special category of search tasks known as exploratory search. These approaches creatively combined search, browsing, and information analysis steps shifting user efforts from recall (formulating a query) to recognition (i.e., selecting a link) and helping them to gradually learn more about the explored domain. More recently, a few projects demonstrated that personalising the process of information exploration with models of user interests can add value to information exploration systems.",
    },
    {
      id: "n2.2",
      label: "You tube",
      description:
      "Over the past two decades, several information exploration ap- proaches were suggested to support a special category of search tasks known as exploratory search. These approaches creatively combined search, browsing, and information analysis steps shifting user efforts from recall (formulating a query) to recognition (i.e., selecting a link) and helping them to gradually learn more about the explored domain. More recently, a few projects demonstrated that personalising the process of information exploration with models of user interests can add value to information exploration systems.",
    },

    {
      id: "n3",
      label: "Getting to Know Your Data",
      description:
      "Over the past two decades, several information exploration ap- proaches were suggested to support a special category of search tasks known as exploratory search. These approaches creatively combined search, browsing, and information analysis steps shifting user efforts from recall (formulating a query) to recognition (i.e., selecting a link) and helping them to gradually learn more about the explored domain. More recently, a few projects demonstrated that personalising the process of information exploration with models of user interests can add value to information exploration systems.",
    },
    {
      id: "n4",
      label: "Knowledge Representation",
      description:
      "Over the past two decades, several information exploration ap- proaches were suggested to support a special category of search tasks known as exploratory search. These approaches creatively combined search, browsing, and information analysis steps shifting user efforts from recall (formulating a query) to recognition (i.e., selecting a link) and helping them to gradually learn more about the explored domain. More recently, a few projects demonstrated that personalising the process of information exploration with models of user interests can add value to information exploration systems.",
    },
    {
      id: "n5",
      label: "Association Rule Mining",
      description:
      "Over the past two decades, several information exploration ap- proaches were suggested to support a special category of search tasks known as exploratory search. These approaches creatively combined search, browsing, and information analysis steps shifting user efforts from recall (formulating a query) to recognition (i.e., selecting a link) and helping them to gradually learn more about the explored domain. More recently, a few projects demonstrated that personalising the process of information exploration with models of user interests can add value to information exploration systems.",
    },
    { id: "n6", label: "Apriori" },

    { id: "n7", label: "Formal Methods" },
    { id: "n8", label: "Transition Systems" },
    { id: "n9", label: "Modelling Hardware and Software Systems" },
    { id: "n10", label: "Propositional Logic" },
    { id: "n11", label: "Predicate Logic" },

    { id: "n12", label: "Parallel Computing" },
    { id: "n13", label: "OpenMP" },

    { id: "n14", label: "Database III" },
    { id: "n15", label: "DB security" },
    { id: "n16", label: "Indexing" },
    { id: "n17", label: "Query Optimization" },
    { id: "n18", label: "Transaction Management" },
  ],
  
  edges: [
    { id: "e1", source: "n1", target: "n2", label: "SEES" },
    { id: "e1.1", source: "n2", target: "n2.1", label: "SEES" },
    { id: "e1.2", source: "n2", target: "n2.2", label: "SEES" },

    { id: "e2", source: "n1", target: "n3", label: "SEES" },
    { id: "e3", source: "n1", target: "n4", label: "SEES" },
    { id: "e4", source: "n1", target: "n5", label: "SEES" },
    { id: "e6", source: "n1", target: "n6", label: "SEES" },

    { id: "e7", source: "n7", target: "n8", label: "SEES" },
    { id: "e8", source: "n1", target: "n9", label: "SEES" },
    { id: "e9", source: "n1", target: "n10", label: "SEES" },
    { id: "e10", source: "n1", target: "n11", label: "SEES" },

    { id: "e11", source: "n12", target: "n13", label: "SEES" },

    { id: "e12", source: "n14", target: "n15", label: "SEES" },
    { id: "e13", source: "n14", target: "n16", label: "SEES" },
    { id: "e14", source: "n14", target: "n17", label: "SEES" },
    { id: "e15", source: "n14", target: "n18", label: "SEES" },
  ],
};

export default myGraph;
