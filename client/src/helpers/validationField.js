//validsation fild with regular expressions
export const validationField = () => {
  let _regex = {
    _name: /^.{4,}/,
    _description: /^[a-zA-Z0-9]+$/,
    _release_date: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
    _rating: /^[0-9]{1,2}|[0-9]{1,2}\.[0-9]{1,2}$/,
  };
  let _messageError = {
    _name: "Name must be only letters",
    _description: "Description must be only letters",
    _release_date: "Release date must be only format date",
    _platform: "should select a or match platform",
    _genres: "should select a or match genre",
    _rating: "Rating must be only numbers or decimal",
  };

  const validationInput = (nameVariable, value) => {
    let _response = {};
    if (_regex[nameVariable].test(value)) {
      _response = {
        state: false,
        message: "",
      };
    } else {
      _response = {
        state: true,
        message: _messageError[nameVariable],
      };
    }
    return _response;
  };
  const validationSelect = (nameVariable, value) => {
    let _response = {};
    if (value.length > 0) {
      _response = {
        state: false,
        message: "",
      };
    } else {
      _response = {
        state: true,
        message: _messageError[nameVariable],
      };
    }
    return _response;
  }

  const name = value => {
    return validationInput("_name", value);
  };
  const description = value => {
    return validationInput("_description", value);
  };
  const release_date = value => {
    return validationInput("_release_date", value);
  };
  const rating = value => {
    return validationInput("_rating", value);
  };

  const platform = value => {
    return validationSelect("_platform", value);
  }
  const genres = value => {
    return validationSelect("_genres", value);
  }

  return {
    name,
    description,
    release_date,
    rating,
    platform,
    genres
  };
};
