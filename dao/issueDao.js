
var issues = [
              {
            	  id: 1,
            	  title: "課題1",
            	  description: "課題1説明"
              },
              {
            	  id: 2,
            	  title: "課題2",
            	  description: "課題2説明"
              },
              {
            	  id: 3,
            	  title: "課題3",
            	  description: "課題3説明"
              },
              {
            	  id: 4,
            	  title: "課題4",
            	  description: "課題4説明"
              },
              {
            	  id: 5,
            	  title: "課題5",
            	  description: "課題5説明"
              },
             ];

exports.getIssues = function() {
	return issues;
}