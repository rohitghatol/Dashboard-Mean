'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
  relationship = require('mongoose-relationship');

/**
 * Employee Schema
 */
var EmployeeSchema = new Schema({
	firstName: {
		type: String,
		default: '',
		required: 'Please fill Employee First Name',
		trim: true
	},
  lastName: {
    type: String,
    default: '',
    required: 'Please fill Employee Last Name',
    trim: true
  },
  skills:[
    {
      name:String
    }
  ],
  belongsTo:{
    type:Schema.ObjectId,
    ref:'Organization',
    childPath:'members'
  },
  worksFor:[{
    type:Schema.ObjectId,
    ref:'Project',
    childPath:'projects'
  }],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});
EmployeeSchema.plugin(relationship, { relationshipPathName:['belongsTo','worksFor'] });

mongoose.model('Employee', EmployeeSchema);