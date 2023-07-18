import { ICourse, IQuiz } from "../interfaces";
import { CourseModel } from "../model";

class CourseServices {
  // Create Course
  public async CreateCourse(course: ICourse): Promise<ICourse> {
    const createdCourse = await CourseModel.create(course);
    return createdCourse;
  }
  // Get all Course
  public async GetAllCourses(): Promise<ICourse[]> {
    const courses = await CourseModel.find();
    return courses;
  }
  // Get a course
  public async GetOneCourse(courseId: string): Promise<ICourse | null> {
    const course = await CourseModel.findById(courseId);
    return course;
  }
  // Add Quiz to Course
  public async AddQuiz(
    courseId: string,
    quiz: IQuiz
  ): Promise<ICourse | null> {
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      courseId,
      { $push: { quizzes: quiz } },
      { new: true }
    );
    return updatedCourse;
  }

  //Get all Quiz,
  public async GetAllQuizzes():Promise<IQuiz[]>{
    const courses = await CourseModel.find({}, { quizzes: 1 });
    const quizzes: IQuiz[] = courses.reduce((acc: IQuiz[], curr: ICourse) => {
      return acc.concat(curr.quizzes);
    }, []);
    return quizzes;
  }
  //Update Quiz

public async UpdateQuiz (quizId: string, updatedQuiz: IQuiz): Promise<IQuiz | null> {
    const updatedCourse = await CourseModel.findOneAndUpdate(
      { "quizzes._id": quizId },
      { $set: { "quizzes.$": updatedQuiz } },
      { new: true }
    );
    if (updatedCourse) {
      const quiz = updatedCourse.quizzes.find((q: IQuiz) => q._id?.toString() === quizId);
      return quiz || null;
    }
    return null;
  }
  
  //Create Random quiz - AI
  
  //Update Assignment
  // Add Assignment to Course
  //Get all Assignment
}

export default CourseServices