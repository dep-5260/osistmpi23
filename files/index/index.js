/**
 * @fileoverview Functions for Club page template.
 */

/* Functions to execute on page load */
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      upcomingFill();
      memberFill();
      galleryFill();
      aboutFill();
  
      navClickEvents(mainNav);
      navClickEvents(join);
      galleryClickEvents();
    }
  };
  
  /*--- DOM Events functions ---*/
  function navClickEvents(nav) {
    var listItems = nav.querySelectorAll('span');
  
    for(var i=0; i < listItems.length; i++) {
      var li = listItems[i];
      li.addEventListener('click', function() {
        var old = document.querySelector('.active');
        old.classList.remove('active');
        this.classList.add('active');
        
        var oldId = old.innerText.split(' ')[0].toLowerCase();
        var oldEl = document.getElementById(oldId);
        oldEl.style.display = 'none';
  
        var id = this.innerText.split(' ')[0].toLowerCase();
        var el = document.getElementById(id);
        el.style.display = 'flex';
      })
    }
  }
  
  function galleryClickEvents() {
    var target = photos.querySelectorAll('img');
  
    for (var i = 0; i < target.length; i++) {
      target[i].addEventListener('click', function(){
        if(!this.classList.contains('focus')){
          target.forEach(function(el) {
            el.classList.remove('focus');
          });
        }
        this.classList.toggle('focus');
      });
    }
  }
  
  
  /*-- Page Manipulation functions --*/
  function upcomingFill() {
    var header = makeElement('h1', 'title', 'Upcoming Events');
    upcoming.appendChild(header);
  
    events.forEach(function(el) {
      var container = makeElement('div', 'event', null);
      var title = makeElement('h2', 'subtitle', el.title);
      var date = makeElement('span', 'date', el.date);
      var time = makeElement('span', 'time', el.time);
      var description = makeElement('p', 'eventDescription', el.description);
  
      appendChildren(container, title, date, time, description);
  
      upcoming.appendChild(container);
    });
  }
  
  function galleryFill() {
      var header = makeElement('h1', 'title', 'Gallery');
      var display = makeElement('div', 'photos', null);
  
      for(var name in gallery){
        var photoDiv = fillPhotos(gallery[name], name);
        display.appendChild(photoDiv);
      }
  
      appendChildren(photos, header, display);
  }
  
  function aboutFill() {
    var header = makeElement('h1', 'title', 'About Us');
    about.appendChild(header)
  
    aboutText.forEach(function(el){
      var p = makeElement('p', null, el);
      about.appendChild(p);
    });
  }
  
  function memberFill() {
    var header = makeElement('h1', 'title', 'Member Information');
    var rules = fillRules(memberInfo.rules);
    var contacts = fillFromObject(memberInfo.contacts, 'contacts');
    var resources = fillFromObject(memberInfo.resources, 'resources');
  
    appendChildren(members, header, rules, contacts, resources);
  }
  
  function makeElement(type, style, text) {
    var el = document.createElement(type);
  
    if(style) {
      el.classList.add(style);
    }
  
    if(text) {
      var text = document.createTextNode(text);
      el.appendChild(text);
    }
  
    return el;
  }
  
  function appendChildren(parent) {
    var children = Array.prototype.slice.call(arguments, 1);
  
    children.forEach(function(el) {
      parent.appendChild(el);
    })
  }
  
  function fillPhotos(arr, name) {
    var div = makeElement('div', name, null);
  
    arr.forEach(function(el) {
      var photo = makeElement('img', 'thumbnail', null)
      photo.src = el['url'];
      photo.alt = el['title'];
  
      div.appendChild(photo);
    });
  
    return div;
  }
  
  function fillRules(arr) {
    var div = makeElement('div', 'rules', null);
    var header = makeElement('h2', 'subtitle', 'rules');
    var list = makeElement('ul', 'rules', null)
  
    arr.forEach(function(el) {
      var rule = makeElement('li', 'rule', el);
      list.appendChild(rule);
    });
  
    appendChildren(div, header, list);
  
    return div;
  }
  
  function fillFromObject(arr, name) {
    var div = makeElement('div', name, null);
    var header = makeElement('h2', 'subtitle', name);
    var list = makeElement('ul', name, null);
  
    arr.forEach(function(obj) {
      var section = makeElement('ul', null, null);
      for(var info in obj) {
  
        if(info == 'url') {
          var item = makeElement('li', info, null);
          var link = makeElement('a', null, obj[info]);
          link.href = obj[info];
          item.appendChild(link);
        }else {
          var item = makeElement('li', info, obj[info]);
        }
        section.appendChild(item);
      }
      list.appendChild(section);
    });
  
    appendChildren(div, header, list);
  
    return div;
  }
  
  
  /**
   * @fileoverview Variables and Objects for Club page template.
   */
  
  /*--- DOM Variables ---*/
  var upcoming = document.querySelector('.events');
  var photos = document.querySelector('.gallery');
  var about = document.querySelector('.about');
  var members =  document.querySelector('.members');
  var join = document.querySelector('.btn-join');
  var mainNav = document.querySelector('.nav');
  
  /*--- Div Variable Arrays and Objects ---*/
  var events = [
    {
      title: 'Industry Meet and Greet',
      date: '5 May 2017',
      time: '5 pm',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      title: 'Front-End Study Group',
      date: '8 May 2017',
      time: '6 pm',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      title: 'Full-Stack Study Group',
      date: '10 May 2017',
      time: '6 pm',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      title: 'HTML & CSS Basics',
      date: '12 May 2017',
      time: '7 pm',
      time: '7 pm',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      title: 'Javascript Basics',
      date: '19 May 2017',
      time: '7 pm',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      title: 'React for Beginners',
      date: '22 May 2017',
      time: '6 pm',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  ];
  
  var gallery = {
    meet: [
      {
        title: 'January 2017 Meet and Greet',
        url: 'http://www.cowerks.com/wp-content/uploads/2016/07/IMG_3552-700x500.jpg'
      },
      {
        title: 'November 2016 Meet and Greet',
        url: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F26024609%2F184476934004%2F1%2Foriginal.jpg?h=230&w=460&rect=0%2C300%2C720%2C360&s=57b9dbbfd0d2ad02c02d3fbfef5d4b4d'
      },
      {
        title: 'August 2016 Meet and Greet',
        url: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F28748442%2F192688563840%2F1%2Foriginal.jpg?h=230&w=460&rect=22%2C4%2C692%2C346&s=17b1ecf54b0fa3a5c4e142a585bfc7cf'
      }
    ],
    study: [
      {
        title: 'January 2017 Full-Stack Study Group',
        url: 'https://cdn-images-1.medium.com/max/800/1*TwdPGVi5n7pW87h-Wl4aNg.jpeg'
      },
      {
        title: 'November 2016 Back-End Study Group',
        url: 'https://cdn-images-1.medium.com/max/800/1*dnzg1Tey4bhw6oMa-u39Yg.jpeg'
      },
      {
        title: 'August 2016 Front-End Study Group',
        url: "https://cdn-images-1.medium.com/max/800/1*GTUF3z_4EwvPDCNHMLNUdA.jpeg"
      }
    ],
    classes: [
      {
        title: 'Building in Angular',
        url: 'https://galvanize-wp.s3.amazonaws.com/wp-content/uploads/2016/03/11140207/Boulder-Colorado-GSchool-Galvanize-23rd-Studios-79.jpg'
      },
      {
        title: 'HTML & CSS Basics',
        url: 'https://d2tovwv1y8kfyq.cloudfront.net/wp-content/uploads/2017/01/24141352/31273581123-27441963.jpg'
      },
      {
        title: 'Technical Interviewing',
        url: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F27695821%2F193630890272%2F1%2Foriginal.jpg?w=1000&rect=0%2C408%2C3264%2C1632&s=ab6a782d8c0b865f7fb5221ee4cfe969'
      }
    ],
  };
  
  var aboutText = [
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."  ,
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  ];
  
  var locationEmbed = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1285.2754554056617!2d-104.90492009017395!3d39.231708878140296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876ca44f8ea73387%3A0x6bfed53504b07bdc!2sLarkspur+Elementary+School!5e0!3m2!1sen!2sus!4v1490562341621" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'
  
  var memberInfo = {
    rules: [
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ],
  
    contacts: [
      {
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '(123) 456-7890'
      },
      {
        name: 'Jane Doe',
        email: 'jane.doe@email.com',
        phone: '(354) 567-2534'
      },
      {
        name: 'Michael Scott',
        email: 'michael.scott@email.com',
        phone: '(342) 098-8237'
      },
      {
        name: 'Sally Derby',
        email: 'sally.derby@email.com',
        phone: '(534) 687-0823'
      }
    ],
  
    resources: [
      {
        name: 'FreeCodeCamp',
        url: 'https://www.freecodecamp.com'
      },
      {
        name: 'Mozilla Developer Network',
        url: 'https://developer.mozilla.org/en-US/'
      },
      {
        name: 'W3Schools',
        url: 'https://www.w3schools.com'
      }
    ]
  }