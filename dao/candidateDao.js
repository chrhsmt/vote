
var candidates = [
                    {
                    	id:0,
                    	name:"テスト太郎",
                    	description:"説明",
                    	thumbUrl: "",
                    	birthDay:"2012/12/16"
                    },
                    {
                    	id:1,
                    	name:"テスト二郎",
                    	description:"説明",
                    	thumbUrl: "",
                    	birthDay:"2012/12/16"
                    }
                    ];

exports.getCandidates = function() {
	return candidates;
};

exports.getById = function(id) {
	for (i = 0; i < candidates.length; i++) {
		if (candidates[i].id == id) {
			return candidates[i];
		}
	}
	return null;
};