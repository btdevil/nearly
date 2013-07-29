<%@ page import="com.day.cq.commons.Doctype, com.day.cq.i18n.I18n, com.day.text.Text" %>
<%@ include file="/apps/nearly-demo/components/global.jspx" %>
<%@taglib prefix="ne" uri="http://demo.nearly.com/taglibs/nearly-demo-taglib" %>
<cq:setContentBundle />
<%
    I18n i18n = new I18n(slingRequest);

    String home = Text.getAbsoluteParent(currentPage.getPath(), 2);


%>


    <div class="header-cont clear">
        <ul><li class="acc">Menu</li></ul>
        <a class="logo" href="<%= home %>.html">
        Near<span class="italSc">.ly</span>
        </a>
    </div>


