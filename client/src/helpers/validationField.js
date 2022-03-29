//validsation fild with regular expressions
export const validationField = () => {
  let _regex = {
    _name: /^.{1,}/,
    _description: /^^.{20,}/,
    _release_date: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
    _rating: /^([0-9])(\.[0-9]{1})?$/gm,
  };
  let _messageError = {
    _name: "Must be at least 4 characters example: mario",
    _description: "Description must contain a paragraph",
    _release_date: "Release date must be only format date",
    _platform: "should select a or match platform",
    _genres: "should select zero or match genre",
    _rating: "Rating must be number example: 1.5 or 4",
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
  };

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
  };
  const genres = value => {
    return validationSelect("_genres", value);
  };
  const submitValidateGame = ({ name, description, release_date, rating, platform, genres }) => {
    let _response = {
      state: false,
      message: "",
    };
    if (
      name.state ||
      description.state ||
      release_date.state ||
      rating.state ||
      platform.state ||
      genres.state
    ) {
      _response = {
        state: true,
        message: "have field with error ",
      };
    } else {
      _response = {
        state: false,
        message: "",
      };
    }
    return _response;
  };

  return {
    name,
    description,
    release_date,
    rating,
    platform,
    genres,
    submitValidateGame,
  };
};
