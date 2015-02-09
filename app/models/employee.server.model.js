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
    childPath:'members'
  }],
  role:{
    type:String,
    enum:['Junior Software Developer','Software Developer','Senior Software Developer','Junior QA Engineer','QA Engineer','Senior QA Engineer','Tech Lead','QA Lead','Engineering Manager','QA Manager','Architect','BU Head']
  },
  billable:{
    type:Boolean
  },
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

EmployeeSchema.pre('save',function(next){
  console.log('Employee is being changed');

  this.before=this.belongsTo;
  next();
});

EmployeeSchema.post('save',function(doc){
  console.log('Employee has changed');
  console.log('Before-->');
  console.log('    '+this.before);
  console.log('After--->');
  console.log('    '+this.belongsTo);
});

EmployeeSchema.plugin(relationship, { relationshipPathName:['belongsTo','worksFor'] });

mongoose.model('Employee', EmployeeSchema);