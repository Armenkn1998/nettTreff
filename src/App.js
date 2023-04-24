
import './App.css';
import { toWords } from 'number-to-words';
import { Country, State, City } from 'country-state-city';
import { useState } from 'react';
import axios from 'axios';
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form"
const eye = <FontAwesomeIcon icon={faEye} />;

function App() {

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [count, setCount] = useState(1)
  const [passwordShown, setPasswordShown] = useState(false);
  const [succsess, setSuccsess] = useState(false)

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  // const {
  //   register,
  //   // handleSubmit,
  //   formState: { errors }
  // } = useForm();
  // const  onSubmit = async () => {
  //   // e.preventDefault();
  //   console.log(userName, password);
  //   try{
  //   const response = await axios.post("https://iconnect247.net/api/v2/sessions", {
  //     username: userName,
  //     password: password,
  //     site_key:"no01"
  //   })
  //   setSuccsess("Succeeded")
  // }
  //   catch(error){
  //     setSuccsess("Failed")
  //   }
  // }
  let age = []
  for (let index = 18; index < 65; index++) {
    let el = toWords(index)
    age.push({ value: el, label: index },)
  }
  const genders = [
    { value: "man", label: "a man looking for a woman" },
    { value: "woman", label: "a man looking for a man" },
  ]
  const customStyles = {
    control: (provided) => ({
      ...provided,
      alignItems: 'center',
      width: 380,
      height: 50,
      borderRadius: 14,
      borderWidth: 2,
      borderColor: '#F6A95F',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#666',
      },
      '@media (max-width: 1335px)': {
        width: '350px',
      },
      '@media (max-width: 1220px)': {
        width: '300px',
      },
      '@media (max-width: 1120px)': {
        width: '260px',
      },
      '@media (max-width: 1000px)': {
        width: '240px',
      },
      '@media (max-width: 900px)': {
        width: '340px',
      },
      '@media (max-width: 760px)': {
        width: '270px',
      },
      '@media (max-width: 630px)': {
        width: '250px',
      },
      '@media (max-width: 500px)': {
        width: '230px',
      },

    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#666' : '#fff',
      color: state.isSelected ? '#fff' : '#333',
      '&:hover': {
        backgroundColor: state.isSelected ? '#666' : '#f1f1f1',
        color: state.isSelected ? '#fff' : '#333',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#999',
      fontStyle: 'Manrope',
      marginBottom: 10,
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: '#999',
      width: '0px',
      height: '30px',
      margin: '0 20px',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,

      '& > div': {
        marginRight: '20px',
        marginBottom: '10px'
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      marginBottom: 10,
      fontFmily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: 16,

      color: '#3E352F;'
    }),

  };
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(userName, password);
    try {
      const response = await axios.post("https://iconnect247.net/api/v2/sessions", {
        username: userName,
        password: password,
        site_key: "no01"
      })
      setSuccsess("Succeeded")
    }
    catch (error) {
      setSuccsess("Failed")
    }

  };
  function back(count) {
    if (count === 1) {
      setCount(count);
    } else {
      setCount(count - 1)
    }
  }
  function nexts(count) {
    if (count === 5) {
      setCount(count);
    } else {
      setCount(count + 1)
    }
  }
  return (
    <div className={succsess ? "Apps" : "App"}>
      {succsess && <div className='sucssess'>
        <h2>{succsess}</h2>
        <button onClick={() => setSuccsess(!succsess)}>ok</button>
      </div>}
      {!succsess && <> <div className='container'>
        <div className="lg_mobile">
          <img className='logo' src="./images/logo.png" />

        </div>
        <div className='registr-box'>
          <h3 className='registr-head'>GET LOVELY CUTIES IN YOUR AREA!</h3>
          <form className='form' onSubmit={handleSubmit} >

            <div className={count === 1 ? "form-box" : "form-box"}>
              <p>I am:</p>
              <Select styles={customStyles}
                options={genders}
                placeholder=" man looking for a woman"
              />
            </div>
            <div className={count === 1 ? 'form1-box' : 'form-box'}>
              <p>I am:</p>
              <Select styles={customStyles}
                options={genders}
                placeholder=" man looking for a woman"

              />
            </div>
            <div className={count === 2 ? "form1-box" : 'form-box'}>
              <p>My age:</p>
              <Select styles={customStyles}
                options={age}
                placeholder="select your age"
              />
            </div>
            <div className={count === 3 ? "form1-box" : 'form-box'}>
              <p>My location:</p>
              {!selectedCountry && <Select styles={customStyles}
                options={Country.getAllCountries()}
                getOptionLabel={(options) => {
                  return options["name"];
                }}
                getOptionValue={(options) => {
                  return options["name"];
                }}
                placeholder="city/village/town/region"
                value={selectedCountry}
                onChange={(item) => {
                  setSelectedCountry(item);
                }}
              />}
              {(selectedCountry && !selectedState) && <Select styles={customStyles}
                options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                getOptionLabel={(options) => {
                  return options["name"];
                }}
                getOptionValue={(options) => {
                  return options["name"];
                }}
                placeholder="select your region"
                value={selectedState}
                onChange={(item) => {
                  setSelectedState(item);
                }}
              />}
              {selectedState && <Select styles={customStyles}
                options={City.getCitiesOfState(
                  selectedState?.countryCode,
                  selectedState?.isoCode
                )}
                getOptionLabel={(options) => {
                  return options["name"];
                }}
                getOptionValue={(options) => {
                  return options["name"];
                }}
                placeholder="select your city or village"
                value={selectedCity}
                onChange={(item) => {
                  setSelectedCity(item);
                }}
              />}

            </div>
            <div className={count === 3 ? 'roads1' : 'roads'}>
              <p>E.g. New Roads or 70760 <br></br>
                We don’t use postal addresses to contact members directly!</p>
            </div>

            <div className={count === 4 ? "form1-box" : 'form-box'}>
              <label>My email:</label>
              <input placeholder="your email address" onChange={(e) => setUserName(e.target.value)}
              // {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
              ></input>

            </div>
            {/* {errors.email && <span className= 'error'>Oops! There may be a mistake in your email address. Please check. If you've already signed up at our site, please use the login form.</span>} */}
            <div className={count === 5 ? "form1-box" : 'form-box'}>
              <label>My password:</label>
              <input
                placeholder="create your password"
                type={passwordShown ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}

              ></input>
              <div className='pass-wrapper'> <i onClick={togglePasswordVisiblity}>{eye}</i>{" "}</div>
            </div>
            <div className='submit'>
              <button >Start</button>
            </div>


          </form>
          < div className='mobile-submit'>
            <button className={count === 1 && "backdis"} onClick={() => back(count)}> <span>{"<"}</span><p>Back</p> </button>
            {count !== 5 ? <button className={count === 1 && "nextdis"} onClick={() => nexts(count)}><span>Next</span><p>{">"}</p></button>
              :
              <button className={(userName && password) ? "" : "disabled"} onClick={(e) => handleSubmit(e)}>Start</button>
            }
          </div>
          <div className='mobile-img'>
            <img src='./images/logo1.png' />
            {count >= 2 ? <img src='./images/logo1.png' /> : <img src='./images/logo2.png' />}
            {count >= 3 ? <img src='./images/logo1.png' /> : <img src='./images/logo2.png' />}
            {count >= 4 ? <img src='./images/logo1.png' /> : <img src='./images/logo2.png' />}
            {count >= 5 ? <img src='./images/logo1.png' /> : <img src='./images/logo2.png' />}

          </div>
          <div className='login'>
            <p>Already signed up? </p>
            <span>Log in</span>

          </div>
        </div>
        <div className='img-box'>
          <img className='logo' src="./images/logo.png" />
          <img className='pic' src="./images/Pic.png" />
          <img className='pic1' src="./images/Pic1.png" />
        </div>
      </div>
        <div className='info'>
          <div>
            <a target='_blank' href='https://www.nett-treff.com/c3RhdGljUGFnZS9wcml2YWN5cG9saWN5bmV0dC10cmVmZi5jb20='>Privacy Policy</a>
            <a target='_blank' href='https://www.nett-treff.com/c3RhdGljUGFnZS90ZXJtc25ldHQtdHJlZmYuY29t'>Terms of Use</a>
            <a target='_blank' href='https://www.nett-treff.com/c3RhdGljUGFnZS90ZXJtcz9odG1sPXNhZmVkYXRpbmduZXR0LXRyZWZmLmNvbQ=='>Safe Dating</a>
            <a target='_blank' href='https://www.nett-treff.com/support/contactUs'>Contact Us</a>
          </div>
          <p>© Copyright 2023, Kaleton Web s.r.o.</p>
        </div></>}
    </div>

  );
}

export default App;
