# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

notes = Note.create([{
			student_name: '神大樹',
			student_number: 2,
			student_grade: 4,
			student_class: 1,
			title: 'かじゃ',
			body: 'こあ',
			observed_at: '2012-08-28',
			weather: '晴れ',
			event_name: '尾駮沼観察',
			latitude: +Random.rand(0.01)-0.005 ,
			longitude: +Random.rand(0.01)-0.005,
}])