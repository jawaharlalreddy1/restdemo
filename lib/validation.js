var request = require('request')
var prdInst = require('./product-instance')

exports.validate = function (req, response, callback) {
  // Business Description vlaidaiton
  if (!req.body.Content.BusinessDescription)
    response.error.push('Business descr can not be null')
  if (req.body.Content.BusinessDescription.length > 50)
    response.error.push('Business Description Length is Greater then 50')

  // Start Date Validation
  if (!req.body.Content.StartDate)
    response.error.push('Start Date Can not be null')
  if (new Date(req.body.Content.StartDate) < new Date())
    response.error.push('Start Date should be greater than today')

  // Phone number validaiton
  if (!req.body.Content.PhoneNumber)
    response.error.push('Phone number can not be null')
  if (req.body.Content.PhoneNumber.length != 10)
    response.error.push('Phone number should be 10 digits')

  // Category List valiation 
  if (req.body.Content.CategoryList.length == 0)
    response.error.push('Atleast One Category Is required')
  if (req.body.Content.CategoryList.length > 5)
    response.error.push('Maximum Five categories are allowed')

  // Request type validation
  if (!req.body.ProductHeader.enterpriseItemId)
    response.error.push('enterprise ItemId should not be null')
  else {
    console.time('startTime')
    prdInst.get(req.body.ProductHeader.enterpriseItemId, function (data, id) {
      if (data == null) {
        console.log('Error while executing DB operations : Validation.js')
        response.error.push('Error while executing DB operations')
      }
      else if (data.length == 0) {
        console.log('POST Request from validation .js  : ')
      }else {
        console.log('PUT Reqeust from validation.js ' + id)
        response.error.push('Reqest type should be PUT')
      }
      // callback(response.error)
      request(req.body.Content.DestinationURL, function (err, pingres, body) {
        if (err || pingres.statusCode != 200) {
          response.error.push('URL not Reachable, not able to ping given Destination URL')
          console.log('URL not Reachable/ not able to ping given Destination URL')
        }
        callback(response.error)
      })
    })
  }
  console.timeEnd('startTime')
  // Destination URL validation
  if (!req.body.Content.DestinationURL) {
    response.error.push('Destination URL should not be null')
  }
  console.time('dbWriteTime')
  console.log('response.error.length  : ' + response.error.length)
}
