

const getSearchResult = async (searchTerm,element,pageNumber = 1,pageSize = 10, searchType = 'type1') =>{
    // console.log(searchTerm)
   

    console.log(searchType)
     
     
    // console.log(element)
    let bodyData = ''
    if(searchType == 'type2'){
      bodyData =  {
        query: {
          wildcard: {
            [element]: {
              value: "*"+ searchTerm +"*",
              boost: 1.0,
              rewrite: "constant_score_blended"
            }
          }
        },
        size: pageSize,
        from: (pageNumber - 1) * pageSize
      };

    }
    else if(searchType == 'type3'){



      


      bodyData =  {
        query: {
          fuzzy: {
            [element]: {
              value: searchTerm,
              fuzziness: "1",
              "max_expansions": 10,
              "prefix_length": 0,
              "transpositions": true,
              "rewrite": "constant_score_blended"
            }
          }
        },
        size: pageSize,
        from: (pageNumber - 1) * pageSize
      };






    }else{
     bodyData =  {
        query: {
          match_phrase: {
            [element]: searchTerm
          }, 
        },
        size: pageSize,
        from: (pageNumber - 1) * pageSize
      };

    }
      const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData)
    }
    const response = await fetch('http://localhost:9200/data/_search', config);


    if (response.status !== 200) { 
        console.log(response)
        throw new Error('errrr');

     }

    let data = await response.json();
    console.log( data)
    return data
    
}