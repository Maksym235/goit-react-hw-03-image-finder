import React from 'react';
import {
  SearchbarSt,
  SearchFormBtn,
  SearchFormInput,
  SearchFormSt,
  SearchFormBtnLabel,
} from './Searchbar.styled';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';
export class Searchbar extends React.Component {
  state = {
    imgName: '',
  };

  onHandelSubmit = evt => {
    evt.preventDefault();
    if (this.state.imgName.trim() === '') {
      toast.warn('enter image name', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    this.props.onSubmit(this.state.imgName);
    this.setState({ imgName: '' });
    evt.target.reset();
  };

  onHandelChange = evt => {
    this.setState({ imgName: evt.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <SearchbarSt className="searchbar">
        <SearchFormSt className="form" onSubmit={this.onHandelSubmit}>
          <SearchFormBtn type="submit" className="button">
            <SearchFormBtnLabel className="button-label">
              Search
            </SearchFormBtnLabel>
            <AiOutlineSearch />
          </SearchFormBtn>

          <SearchFormInput
            className="input"
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onHandelChange}
          />
        </SearchFormSt>
      </SearchbarSt>
    );
  }
}
