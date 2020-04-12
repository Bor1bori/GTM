import locations from '../../sample.json';


export default (req, res) => {
  res.status(200).json(locations);
};