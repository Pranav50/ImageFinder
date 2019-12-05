import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import axios from 'axios'
import ImageResults from './ImageResults'

class Search extends Component {
    state = {
        searchText: '',
        amount: 15,
        apiUrl: 'https://pixabay.com/api',
        apiKey: process.env.REACT_APP_IMAGE_FINDER,
        images: []
    }

    componentDidMount() {
        axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=flowers
                &image_type=photo&per_page=${this.state.amount}&safesearch=true`)
                .then(res => this.setState({images: res.data.hits}))
                .catch(err => console.log(err));
    }

    onTextChange = e => {
        const val = e.target.value;
        this.setState({[e.target.name]: val}, () => {
            if(val === '') {
                this.setState({searchText: []});
            } else {
                axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}
                &image_type=photo&per_page=${this.state.amount}&safesearch=true`)
                .then(res => this.setState({images: res.data.hits}))
                .catch(err => console.log(err));
            }
        });
    };

    onAmountChange = (e, index, value) => {
        this.setState({ amount: value})
    }

    render() {
        const side = {
            marginLeft:"5px"
        }
        return (
            <div style={side}>
                <TextField
                    name="searchText"
                    value={this.state.searchText}
                    onChange={this.onTextChange}
                    floatingLabelText="Search For Images..."
                    fullWidth={true}/>
                    <br/>
                    <SelectField
                        name="amount"
                        floatingLabelText="Images"
                        value={this.state.amount}
                        onChange={this.onAmountChange}>
                            <MenuItem value={5} primaryText="5"/>
                            <MenuItem value={10} primaryText="10"/>
                            <MenuItem value={15} primaryText="15"/>
                            <MenuItem value={20} primaryText="20"/>
                            <MenuItem value={25} primaryText="25"/>

                    </SelectField>
                    <br/>
                    {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />) : null}
            </div>
        )
    }
}

export default Search
