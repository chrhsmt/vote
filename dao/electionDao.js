
var electionList = [
                    {
                    	id:0,
                    	title:"東京都知事選",
                    	description:"東京都知事選::説明",
                    	votingDay:"2012/12/16"
                    },
                    {
                    	id:1,
                    	title:"衆議院総選挙",
                    	description:"衆議院総選挙::説明",
                    	votingDay:"2012/12/16"
                    }
                    ];

exports.getElectionList = function() {
	return electionList;
};