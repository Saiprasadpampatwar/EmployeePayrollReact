import React, { Component } from 'react'
import '../components/Hello.css'
import axios from 'axios'
import path from '../assets/images/logo.png'
import profile1 from '../assets/profile-images/Ellipse -3.png'
import profile2 from '../assets/profile-images/Ellipse -1.png'
import profile3 from '../assets/profile-images/Ellipse -8.png'
import profile4 from '../assets/profile-images/Ellipse -7.png'
import Home from './Home'



class Update extends Component{

    constructor(props){
        super(props)
        this.details =JSON.parse(localStorage.getItem("details"))
        this.state = {
            name: this.details.name,
            imagePath: this.details.imagePath,
            gender:this.details.gender,
            departments :this.details.departments,
            salary: this.details.salary,
            notes:this.details.notes,
            startDate: '',
            employeeId:this.details.employeeId
            
            
        }
        this.Day='01'
        this.Month='Jan'
        this.Year='2021'
        
        this.Engineer=false
        this.Finance=false
        this.Others=false
        this.Sales=false
        this.details.departments.map(dept => {
            if(dept==="Sales") this.Sales=true
            if(dept==="Finance") this.Finance=true
            if(dept==="Engineer") this.Engineer=true
            if(dept==="Others") this.Others=true
            
        })
        
       
    }

    componentDidMount(){
        this.defineDate()
    }

    componentDidUpdate(){
        this.details.departments.map(dept => {
            if(dept==="Sales") this.Sales=true
            if(dept==="Finance") this.Finance=true
            if(dept==="Engineer") this.Engineer=true
            if(dept==="Others") this.Others=true
            
        })
    }

    defineDate = () => {
        this.setState({startDate: this.Day+" "+this.Month+" "+this.Year}) 
        
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    changeHandlerCheckbox = (e) => {
        
        
        this.state.departments.push(e.target.value)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }


    submitHandler = (e) => {
        
        console.log(this.state)
        axios.put(`http://localhost:8080/employeepayrollservice/update/${this.state.employeeId}`,this.state)
        .then(response => {
            console.log(response)
            
        }).catch(error => {
            console.log(error)
        })
        this.props.history.push('/home')
        

    }
    render(){
        return(
            <div>
                <header className="header-content header">
                    <div className="logo-content">
                        <img src={path} alt="logo"/>
                        <div>
                            <span className="emp-text">EMPLOYEE</span><br/>
                            <span className="emp-text emp-payroll">PAYROLL</span>
                        </div>
                    </div>
                </header>
                <div className="form-content">
                    <form className="form" action="#" onreset= "resetForm()" onSubmit={this.submitHandler}>
                        <div className="form-head">Employee Payroll Form</div>
                        <div className="row-content">
                            <label className="label text" for="name">Name</label>
                            <input className="input" type="text" value = {this.state.name} onChange={this.changeHandler} id="name" name="name" placeholder="Your Name.." required/>
                            <error-output className="text-error" for="text"></error-output>
                        </div>
                        <div className="row-content">
                            <label className="label text"  for="profile">Profile image</label>
                            <div className="profile-radio-content">
                            <label>
                                <input type="radio" id="profile1" checked={this.state.imagePath==="../assets/profile-images/Ellipse -3.png"} name="imagePath" value ="../assets/profile-images/Ellipse -3.png"  onChange={this.changeHandler} required/>
                                <img className="profile" id="image1" alt="img" src={profile1}/>
                            </label>
                            <label>
                                <input type="radio" id="profile2" checked={this.state.imagePath==="../assets/profile-images/Ellipse -1.png"} name="imagePath" value = "../assets/profile-images/Ellipse -1.png" onChange={this.changeHandler} required/>
                                <img className="profile" id="image2" alt="img" src={profile2}/>
                            </label>
                            <label>
                                <input type="radio" id="profile3" checked={this.state.imagePath==="../assets/profile-images/Ellipse -8.png"} name="imagePath" value ="../assets/profile-images/Ellipse -8.png"  onChange={this.changeHandler} required/>
                                <img className="profile" id="image3" alt="img" src={profile3}/>
                            </label>
                            <label>
                                <input type="radio" id="profile4" checked={this.state.imagePath==="../assets/profile-images/Ellipse -7.png"} name="imagePath" value ="../assets/profile-images/Ellipse -7.png"  onChange={this.changeHandler} required/>
                                <img className="profile" id="image4" alt="img" src={profile4}/>
                            </label>
                            <error-output className="text-error" for="text"></error-output>
                            </div>
                        </div>
                        <div className="row-content">
                            <label className="label text" for="gender">Gender</label>
                            <div>
                                <input type="radio" checked={this.state.gender==="male"} onChange={this.changeHandler} id="male" name="gender" value="male"/>
                                <label className="text" for="male">Male</label>
                                <input type="radio" checked={this.state.gender==="female"} onChange={this.changeHandler} id="female" name="gender" value="female"/>
                                <label className="text" for="female">Female</label>
                                <error-output className="text-error" for="text"></error-output>
                            </div>
                        </div>
                        <div className="row-content">
                            <label className="label text" for="department">Department</label>
                            <div>
                                <input className = "checkbox" checked = {this.Sales}type = "checkbox" id = "sales" onChange={this.changeHandlerCheckbox} name = "department" value = "Sales"/>
                                <label className = "text" for = "sales">Sales</label>
                                <input className = "checkbox" checked = {this.Finance} type = "checkbox" id = "finance" onChange={this.changeHandlerCheckbox} name = "department" value = "Finance"/>
                                <label className = "text" for = "finance">Finance</label>
                                <input className = "checkbox" checked = {this.Engineer} type = "checkbox" id = "engineer" onChange={this.changeHandlerCheckbox} name = "department" value = "Engineer"/>
                                <label className = "text" for = "engineer">Engineer</label>
                                <input className = "checkbox" checked = {this.Others} type = "checkbox" id = "others" onChange={this.changeHandlerCheckbox} name = "department" value = "Others"/>
                                <label className = "text" for = "others">Others</label>
                        </div>
                            <error-output className="text-error" for="text"></error-output>
                        </div>
                        <div className="row-content">
                            <label className="label text" for="salary">Choose Your Salary: </label>
                            <input className="input" type="range" name="salary" id="salary" onChange={this.changeHandler} min="300000" max="500000" step="100" value={this.state.salary}/>
                            <output className="salary-output text" for="salary">{this.state.salary}</output>
                            <error-output className="text-error" for="text"></error-output>
                        </div>
                        <div className="row-content">
                        <label className="label text" for="startDate">Start Date</label>
                        <div id="date">
                            <select id="day" onChange={this.changeHandler} name="Day">
                                <option value="01">1</option>
                                <option value="02">2</option>
                                <option value="03">3</option>
                                <option value="04">4</option>
                                <option value="05">5</option>
                                <option value="06">6</option>
                                <option value="07">7</option>
                                <option value="08">8</option>
                                <option value="09">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select id="month" onChange={this.changeHandler} name="Month">
                                <option value = "Jan">January</option>
                                <option value = "Feb">February</option>
                                <option value = "Mar">March</option>
                                <option value = "Apr">April</option>
                                <option value = "May">May</option>
                                <option value = "Jun">June</option>
                                <option value = "Jul">July</option>
                                <option value = "Aug">August</option>
                                <option value = "Sep">September</option>
                                <option value = "Oct">October</option>
                                <option value = "Nov">November</option>
                                <option value = "Dec">December</option>
                            </select>
                            <select id="year" onChange={this.changeHandler} name="Year">
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                            </select>
                            </div>
                            <error-output className="date-error" for="startDate"></error-output>
                        </div>
                        <div className="row-content">
                            <label className="label text" for="notes">Notes</label>
                            <textarea id="notes" onChange={this.changeHandler} className="input" name="notes" placeholder="add notes....">{this.state.notes}</textarea>
                        </div>
                        <div className="buttonParent">
                            <a href="./home.html" className="resetButton button cancelButton">cancel</a>
                            <div className="submit-reset">
                                <button type="submit" className="button submitButton" id="submitButton">Submit</button>
                                <button type="reset" className="resetButton button">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Update
