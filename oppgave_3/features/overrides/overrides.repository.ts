export const exist = async (id, day, name) => {
  try {
    const override = await prisma.week.update({

      select: {
        id: id
      }
    })
    
    return {status: true, data: override}
  } catch (error) {
    return {status: false, error: 'Failed to find override'}

  }
}

export const create = async ({id, day, name}) => {
  try {
    const override = await prisma.override.create({
      data: {
        weekDay: day,
        employeeName: name,
      }, include: {
        week: id
      }
    })

    return {status: true, data: override}
  } catch (error) {
    return { status: false, error: 'Failed to create override'}
  }
}