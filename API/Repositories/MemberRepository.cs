using System;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class MemberRepository(AppDbContext context) : IMemberRepository
{
    public IEnumerable<Member> GetAllMembers()
    {
        throw new NotImplementedException();
    }

    public async Task<Member?> GetMemberByIdAsync(string id)
    {
        return await context.Members.FindAsync(id);
    }

    public async Task<IReadOnlyList<Member>> GetMembersAsync()
    {
        return await context.Members
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Photo>> GetPhotosByMemberIdAsync(string memberId)
    {
        return await context.Members
            .Where(x => x.Id == memberId)
            .SelectMany(x => x.Photos)
            .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void UpdateMember(Member member)
    {
        context.Entry(member).State = EntityState.Modified; // purpose is to mark the entity as modified
    }

    void IMemberRepository.RemoveMember(Member member)
    {
        throw new NotImplementedException();
    }
}