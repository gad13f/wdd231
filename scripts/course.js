const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the basic concepts of program structure...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web...',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students become more proficient in writing functions...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces object-oriented programming...',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to create dynamic web pages with JS...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior web development knowledge...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const courseContainer = document.getElementById('course-list');
    const totalCreditsSpan = document.getElementById('total-credits');
    const allBtn = document.getElementById('all-btn');
    const wddBtn = document.getElementById('wdd-btn');
    const cseBtn = document.getElementById('cse-btn');

    function displayCourses(filteredCourses) {
        courseContainer.innerHTML = '';
        
        filteredCourses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;
            courseDiv.innerHTML = `<p>${course.subject} ${course.number}</p>`;
            courseContainer.appendChild(courseDiv);
        });

        // Calculate credits using reduce
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        totalCreditsSpan.textContent = totalCredits;
    }

    function setActiveButton(activeBtn) {
        [allBtn, wddBtn, cseBtn].forEach(btn => btn.classList.remove('active-filter'));
        activeBtn.classList.add('active-filter');
    }

    // Event Listeners for Filtering
    allBtn.addEventListener('click', () => {
        setActiveButton(allBtn);
        displayCourses(courses);
    });

    wddBtn.addEventListener('click', () => {
        setActiveButton(wddBtn);
        const wddCourses = courses.filter(course => course.subject === 'WDD');
        displayCourses(wddCourses);
    });

    cseBtn.addEventListener('click', () => {
        setActiveButton(cseBtn);
        const cseCourses = courses.filter(course => course.subject === 'CSE');
        displayCourses(cseCourses);
    });

    // Initial render
    displayCourses(courses);
});