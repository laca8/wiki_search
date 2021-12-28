import React,{useState} from 'react'
const  App = () => {
  const [search,setSearch] = useState('')
  const [results,setResults] = useState([])
  const [searchInfo,setSearchInfo] = useState({})
  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(search === '') return;
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;
    const res = await fetch(endpoint)
    console.log(res);
    if(!res.ok){
      throw Error(res.statusText)
    }
    const json = await res.json()
    console.log(json);
    setResults(json.query.search)
    setSearchInfo(json.query.searchinfo)
  }
  return (
    <div className="App">
      <header>
      <h1>Wiki Seeker</h1>
      <form className='search-box' onSubmit={handleSubmit}>
        <input type='search' placeholder='what are you looking for?' value={search} onChange={(e) => setSearch(e.target.value)}/>
      </form>
      {(searchInfo.totalhits) ? <p>Search Results: {searchInfo.totalhits}</p> : ''}
      </header>
      <div className='results'>
        {results.map((result,i)=>{
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
          return(
            <div className='result' key={i}>
            <h3>{result.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: result.snippet  }}></p>
							<a href={url} target="_blank" rel="noreferrer">Read more</a>
          </div>
          )
        })}
     
      </div>
    </div>
  );
}

export default App;
