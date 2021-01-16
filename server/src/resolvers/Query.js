async function users(parent, args, context, info) {
  return context.prisma.user.findMany();
}

async function user(parent, args, context, info) {
  return context.prisma.user.findUnique({
    where: {
      email: args.email
    }
  })
}

module.exports = {
  users, 
  user
};