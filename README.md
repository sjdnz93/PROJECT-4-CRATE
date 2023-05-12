# SEI Project 4: CRATE

## Overview
Our fourth and final project for General Assembly’s Software Engineering Immersive course was the biggest by a long shot. Working solo, I had the job of coming up with an idea for, and then designing and building a full-stack web application with full CRUD functionality.

I’m a fan of the Discogs app, so I decided that I’d try to build a rip-off (albeit one that was far more basic) of that app. I named the app Crate (as in, you know, crate digging for new music). The premise is pretty basic, in that users would be able to register an account, login and then effectively catalogue their physical vinyl collection on the app. Users could search through a public database of albums, add these albums to either their wishlist or collection, follow and unfollow other users and leave album reviews.

This was the first project on the course where we would be building a Django API with the Django REST framework using Python, and accessing information stored on a PostgreSQL database. The front-end, meanwhile, was powered by React.

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683887512/Project%204:%20Crate/hero-min_rsb5sg.png)

## Deployment link
My project can be found at the following link:

<a href='https://crate.herokuapp.com/'>CRATE</a>

Login: test@email.com
Password: passpass123

## Code installation
* Fork code from <a href='https://github.com/sjdnz93/project-4-crate'>GitHub repository</a>

**In the project root folder:**
* Install back-end dependencies: ```pipenv install```
* Enter the project shell: ```pipenv shell```
* Make migrations: ```python manage.py makemigrations```
* Migrate: ```python manage.py migrate``` 
* Load record info from database: ```python manage.py loaddata records/seeds.json```
* Load record user info from database: ```python manage.py loaddata users/seeds.json```
* Run server: ```python manage.py runserver```
* Navigate to client folder: ```cd client```
* Install front-end dependencies: ```npm i```
* Start front-end server: ```npm run start```

## Timeframe
This was a solo build, completed over the following dates:

Dates: Apr 14 to Apr 24 2023

## Technologies used
**Planning/testing:**
* Excalidraw (wireframes)
* Insomnia
* Chrome Development Tools
* TablePlus
* Trello
* QuickDBD

**Back-end:**
* Django
* Django REST Framework
* Python
* PostgreSQL
* Pylint
* Psycopg2-binary
* pyjwt

**Front-end:**
* React
* Sass (SCSS)
* Bootstrap
* Axios
* Humps

## Brief
**Technical Requirements:**
* Build a full-stack application by making your own backend and your own front-end
* Use a Python Django API using Django REST Framework to serve your data from a Postgres database
* Consume your API with a separate front-end built with React
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
* Have a visually impressive design to kick your portfolio up a notch and have something to wow future clients & employers. ALLOW time for this
* Be deployed online so it's publicly accessible

## Planning
**Wireframing the basic design/user story for the app:**

Before writing any code whatsoever, I took a good deal of time to really think about what the Crate user journey was going to look like. I decided that I wanted users to have to register an account and login before they could properly interact with the sight. This set the ball rolling and enabled me to build out wireframes for each page of the site. I was really keen to make this project mobile responsive in the first instance, so I designed the mobile wireframes and desktop wireframes simultaneously. Building these wireframes out was super helpful later on in the build. It allowed me to always have a clear overview of how I wanted the pages to look, and also served as a reminder of the various components and functionality that I had left to build.

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683888110/Project%204:%20Crate/planning1_nixlgw.png)

**QuickDBD to plot out the relationships between database models:**

I decided early on that I wanted to keep the site’s functionality reasonably simple so that I could really focus on spending a good amount of time getting the design to a standard I was happy with. As such, I included just three database models, and used QuickDBD to visualise their relationships with one another. This was a useful blueprint to refer back to when it came to building out the models themselves, and the serializers that would be required to populate them.

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683888110/Project%204:%20Crate/planning_pcaai5.png)

**Trello board:**

The last stage of my planning process was to write down as many of the tasks I could foresee needing to be done on a Trello board. Again, this was a useful roadmap that allowed me to roughly gauge how much time I could allocate to each part of the build. In the end, I spent the first day of the project planning, three days building out the back-end, three days building out the front-end and then the final two days on the styling (with a break in between!).

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683888110/Project%204:%20Crate/planning3_xvixic.png)

## Build process
### BACK-END:
* Getting the back-end of the Crate app up and running was the first task that I undertook, and one that proved to be reasonably straightforward in the end. 

* This was largely down to the fact that I’d aimed to keep the relationships and functionality on the back-end pretty simple. That said, there were still one or two challenges that arose, and which I came up with what I felt to be pretty clever solutions!

* After defining the Record and User models, I wanted to get to work on the logic that would allow a user to add a certain record to either their collection or their wishlist. These fields had initially been defined as a key-value pair where the value for each was an empty array. A PUT request was going to be necessary to update these fields accordingly.

* To begin with, I created a new view in my users/views.py file called ```AddRecordToCollectionView```. Then, in my users/urls.py file I defined the endpoint that the request would be sent to:

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683888336/Project%204:%20Crate/build1_oqgqby.png)

* Here, the ```<int:id1>``` placeholder was representative of the id field associated with the logged-in user’s record on the database. Meanwhile, ```<int:id2>``` represented the id for the record that the user wanted to add to their collection.

Within the ```AddRecordToCollectionView``` view, the first step was to retrieve both the user profile and the record info from the database, and save them to a variable that could be worked with at the next steps.

The next step was to serialize the record instance and save to a new variable. Once this was done, I then accessed ```serialized_record.data``` and saved that to a new variable. The same process was followed for the user profile information. The above steps are detailed in the screenshot below.

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683888409/Project%204:%20Crate/build2_abbtts.png)

* In the next step, I appended the record ID to the collection field on the user model. Once that was done, I then defined a new variable called ```final``` and passed that through the ```userCollection``` serializer with the original ```user``` variable, as well as the updated ```to_update``` variable and a ```partial=True``` argument to indicate that it was only one aspect of the original ```user``` model that was being updated.

* I then called the ```is_valid()``` method on ```final```, before saving it to the database.

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683888906/Project%204:%20Crate/build3_w0a8i2.png)

* At this point, I realised that I wanted to include functionality that could check to see if the user’s ‘wishlist’ already contained the record that had just been added to the collection. Afterall, what point would there be in leaving a record in your wishlist if you already had it in your collection? This was a pretty straightforward solution. I passed the original ```user``` instance through a custom ```UserWishlist``` serializer, before saving the returned data to a new variable. Then it was simply a case of checking to see if  ```wl_update``` contained the ```id``` of the record that had just been added to the user’s collection, and removing it if that was the case. If so, I’d also partially update the ```user``` model again, focussing this time specifically on the wishlist field, before checking validity and resaving the user record to the database.

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683888994/Project%204:%20Crate/build4_dtqist.png)

* I ended up implementing a similar piece of functionality when it came to adding records to the user’s wishlist, too. Only this time around I crafted the view to prevent a user from adding a record to their wishlist if it was already in their collection.

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683889036/Project%204:%20Crate/build5_lndce1.png)

* Another aspect of the back-end build that I was fairly pleased with was the approach that I took to seeding. Instead of manually creating and then entering each record, I fed the record model into ChatGPT and asked to generate a series of random entries for me, which I could then simply paste into my seeds file. Ideally, I would have used a third-party music app API such as Spotify or Discogs, but as I wanted to build this part of the database out manually I chose this approach. In future iterations, this is something I’m very keen to implement.

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683889075/Project%204:%20Crate/build6_egcbvk.png)

### FRONT-END:
* Once I was happy with the back-end and I’d added in all of the functionality I thought I’d need (in reality I ended up adding in more functionality than I ended up using), I moved on to crafting the front-end. Again, this part of the build was largely plain sailing, but there were certainly some challenges that I encountered that I’ll lay out below. Having that detailed wireframe that I created right at the beginning of the project really proved to be helpful here, as it helped me to really think about how I was structuring my React components, and also made for a good reminder of all the functionality I wanted to build in.

* I decided fairly early on that I wanted to use the same API endpoint to pull a user’s information down and render the content in React. This endpoint would be the same for the logged in user as it would for any other user pages that person cares to visit. In my App.js file, I’d defined the path for this particular route as ```/profile/:id``` with the ID being the ID associated with that particular user. Any links that pointed to a user’s profile page throughout the app included the user’s ID in the path.

**Route path being defined in App.js, with ```:id``` being added in as a parameter:**
![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683889224/Project%204:%20Crate/build7_r4o2s2.png)

**Here in the SearchUsers.js component, you can see the ID being passed in to the link’s path. These IDs were returned through an earlier ```GET API``` request that returned all users data, so they could be mapped over to dynamically render their profile tiles on the page:**
![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683889224/Project%204:%20Crate/build8_ctf3gf.png)

* Using the ```useParams``` hook meant that I could then extract that ID value to make a further ```GET API``` request on a specific profile page, accessing the end-point associated solely with that user and returning their information. I quickly realised that the dependency for the ```useEffect``` really needed to be that ID value that was being accessed, as initially I could load content for another user, but if I clicked to return to my own profile the API request would not be resent and I’d be left with another user’s info on my page.

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683889321/Project%204:%20Crate/build9_capx9b.png)
![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683889321/Project%204:%20Crate/build10_hdpfqc.png)

* Once that was sorted, I set about introducing the follow/unfollow user functionality. At this point I realised that having access to a profile ID wasn’t going to cut the mustard on its own - I’d also need to access the ID of the logged in user so I could access their information and update it based on a successful follow or unfollow.

* To do this, I created a simple function in helpers/Auth.js that effectively extended my ```getPayload``` function. The ```getPayload``` function, when called, retrieved the JSON web token generated at login from local storage, then breaking it up to extract the payload that contained info on the user. This is then decoded from base64 format using the ```Buffer.from``` method before being converted into a JavaScript Object by being passed through ```JSON.parse``` and returned.

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683889477/Project%204:%20Crate/build11_hvegtz.png)

* The function that I wrote to extend this simply returned the payload sub, which corresponded to the logged in user’s ID value.

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683889527/Project%204:%20Crate/build12_dk73lp.png)

* This sub value could then be used to fire off another API request to retrieve the logged in user’s information on any component of the site. With regards to the Profile.js component, this proved to be particularly useful as it could be used to control what content was rendered, and turn certain pieces of functionality as needed. For example, in the below image the button that links through to the EditProfile.js component will disappear if the sub value does not match the profile.id (preventing logged in user from editing a profile that isn’t theirs).

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683889564/Project%204:%20Crate/build13_b7cvob.png)

* The ability to call the ```getPayloadSub()``` meant I could now get cracking with following and unfollowing a user. In the end, this function was reasonably convoluted, and could use some tidying, but it worked well.

* I used the sub value to make an API request to the endpoint that matched the logged in user’s profile. This information was then saved to state under the ```loggedUser``` variable, with the returned data being passed into the ```setLoggedUser``` setter function.

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683889640/Project%204:%20Crate/build14_h5iak1.png)

* The ```loggedUser``` object’s ‘following’ field was then iterated over so that I could extract the IDs of the accounts that the logged in user was already following. The value of the ID field was accessed using ```Object.values```, looking at the first KVP within each object in the following array. These standalone ID values were then added to an array I’d named ```master```. I’d also extracted the ID of the profile that was being viewed and saved it to the otherId variable using a similar approach.

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683889713/Project%204:%20Crate/build15_fslu9h.png)

* If that newly-populated ```master``` array contained the ID of the profile being viewed already, I allowed the user to unfollow that user through a put request to remove the ID from their following array and then reset state for the logged in user. If the ```master``` array did not contain the ID of the profile being viewed, a similar thing happened but the user was allowed to follow the profile instead.

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683889777/Project%204:%20Crate/build16_nyp2i0.png)

* I had set the follow/unfollow button up to have split functionality to allow both of these tasks to be done from the same button. The above functionality also updated the text of the follow/unfollow button accordingly. However, I was then left with the problem of the site app not knowing whether a user was or wasn’t following another user when they first navigated to their profile. This was solved using a ```useEffect``` that would trigger whenever the ```id``` value changed. Effectively very similar functionality was ported over to this function to search through the logged in user’s ```following``` array, determine if the profile ID of the page being viewed was present, and then render the button text accordingly.

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683889839/Project%204:%20Crate/build17_t2bino.png)

* In terms of front-end functionality, these were the largest challenges I think I faced. Although the functions are rather long-winded in places and could probably do with being tidied up, they work well enough for the purposes intended.

* Once all the functionality I wanted had been implemented, I then proceeded to start on the CSS.

## Challenges
**Underestimating how long it would take to implement CSS:**

I had allowed myself about 3 days to get the CSS up to scratch, which I thought would be plenty. However, some aspects of the front-end build ended up taking me a bit longer to build out than I thought they would, so by the time I was able to start with the CSS in earnest I had roughly 2 days left to get everything done. Somewhat frustratingly, the process of styling the site wasn’t as straightforward as I was hoping it would be. I’m normally pretty confident with this aspect of the build, but for whatever reason it took far longer than it normally would. Layout and responsiveness were particularly challenging, to the extent where I prefer the way the site looks on mobile than it does on desktop. I was a bit disheartened that I couldn’t get the app to look the way I wanted to in the time I had remaining, but on a more positive/optimistic note I’m looking forward to learning some more advanced CSS post-course, and then applying these skills to the project retrospectively.

## Wins
**Planning:**

I think this might have been the first project I’ve worked on where I really felt that the planning I’d implemented at the beginning played a huge role in keeping me focussed, motivated and on track. Not only was I able to keep abreast of the various components that I needed to build out, having a reasonably detailed idea of what the overall design would look like at the end of the build kept me excited about seeing what the finished product would look like!

**Built a working app:**

Not going to lie, there’s a fair amount of additional work that I’d still like to do here. But I’m so proud of the fact that I managed to build this in the time I had. It seems pretty incredible to think that only three months ago I knew very little about web development, and now I can build a working full-stack application from scratch.

## Key learnings/takeaways
Given we’d probably only spent about a week and a half or so learning about Python, Django and Django REST Framework, the fact that we were still able to go out and build a working back-end using these newly introduced technologies was really cool. Having spent the vast majority of the course learning the fundamentals of JavaScript, it was super exciting to be introduced to a new language such as Python, and then after what felt like very little time at all, go out and use it to build a working project. 

I think this has really hammered home the idea that once you have a decent understanding of the logical approach required to solving a problem, using a new technology to solve it isn’t such a massive leap. This has been a big confidence booster, and now that the course has wrapped up I’m really looking forward to developing my knowledge and skill with Python further, and also adding further programming languages to my repertoire.

## Bugs
I haven’t quite added proper authorisation into this site yet, so it is possible to access the site without logging in if you know the URL required.

## Future improvements
* Improve the styling even further - particularly on desktop and tablet. It looks ok as it is, but I’m still not 100% happy with it
* Integrate a third party API (Spotify/Discogs) that pulls in album art, track previews etc.
* Work in YouTube videos for songs from certain albums
* Make the ‘add record to wishlist/collection’ function more intuitive. Currently there aren’t any visual cues to confirm this has been executed successfully. An alert or modal, or a simple toggle button that updates to say you now have a record in your collection would be good.
* The sky’s really the limit. I can see myself continuing to work on and refine this one for a while yet!

